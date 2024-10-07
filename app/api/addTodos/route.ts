import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        if(!broker.started) {
           await broker.start()
        }

        const body = await req.json()
        const {text} = body

        if(!text) {
            return NextResponse.json({error: 'Todo text is required!'}, {status: 400})
        }

        const result = await broker.call('todos.add', {text})
        return NextResponse.json({result}, {status: 201})
    } catch (error) {
        NextResponse.json(error, {status: 500})
    }
}