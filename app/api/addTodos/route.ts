import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        
        const {text, userId} = await req.json()

        if(!text || !userId) {
            return NextResponse.json({error: 'Todo text is required!'}, {status: 400})
        }

        const result = await broker.call('add.todo', {text, userId})

        return NextResponse.json(result, {status: 200})
    } catch (error) {
       return NextResponse.json(error, {status: 500})
    }
}