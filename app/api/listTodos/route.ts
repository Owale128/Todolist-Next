import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'Fallback-jwt'

export async function GET(req: NextRequest) {
    try {

        const token = req.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ message: "Token missing" }, { status: 401 });
        }

        const { userId } = jwt.verify(token, secret) as { userId: string };

        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        const todos = await broker.call('list.todo', { userId});

        return NextResponse.json(todos, {status: 200})
    } catch(error) { 
        return NextResponse.json(error, {status: 500})
    }
}