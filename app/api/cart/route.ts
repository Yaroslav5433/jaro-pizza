import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { findOrCreateCart } from "@/shared/components/shared/lib/find-or-create-cart";
import { updateCartTotalAmount } from "@/shared/components/shared/lib/update-cart-total-amout";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
    try {
      const token = req.cookies.get("cartToken")?.value;
  
      console.log("GET cartToken:", token);
  
      if (!token) {
        return NextResponse.json({
          totalAmount: 0,
          items: [],
        });
      }
  
      const userCart = await prisma.cart.findFirst({
        where: {
          token,
        },
        include: {
          items: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              productItem: {
                include: {
                  product: true,
                },
              },
              ingredients: true,
            },
          },
        },
      });
  
      console.log("GET cart:", userCart);
      console.log("GET cart items:", userCart?.items);
  
      if (!userCart) {
        return NextResponse.json({
          totalAmount: 0,
          items: [],
        });
      }
  
      return NextResponse.json(userCart);
    } catch (error) {
      console.error("GET /api/cart error:", error);
  
      return NextResponse.json(
        {
          error: "Failed to fetch cart",
        },
        {
          status: 500,
        }
      );
    }
  }

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients ?? [],
            },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: (data.ingredients ?? []).map((id) => ({
              id,
            })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);

    response.cookies.set("cartToken", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/cart error:", error);

    return NextResponse.json(
      {
        error: "Failed to add item to cart",
      },
      {
        status: 500,
      }
    );
  }
}