import { prisma } from "@/prisma/prisma";
import { getUserSession } from "@/shared/components/shared/lib/get-user-session";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getUserSession();

        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.id), 
            },
            select: {
                fullname: true,
                email: true,
                password: false,
            }
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}