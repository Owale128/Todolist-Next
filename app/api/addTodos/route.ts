import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        if(!broker.started) {
            broker.start()
        }

        const body = await req.json()
        const {text} = body

        if(!text) {
            return NextResponse.json({error: 'Todo is required!'})
        }

        const result = await broker.call('todos.add', {text})
        return NextResponse.json({result})
    } catch (error) {
        NextResponse.json(error)
    }
}