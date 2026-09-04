import { Ingredient, Product, ProductItem } from "@/generated/prisma-client/client";

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[]}