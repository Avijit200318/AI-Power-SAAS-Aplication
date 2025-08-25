import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

// connect prisma using primaClient
const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json({
            success: true,
            videos
        }, {status: 201});
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching videos",
            success: false
        }, {status: 500});
    } finally {
        await prisma.$disconnect()
    }
}