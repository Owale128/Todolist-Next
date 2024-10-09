import broker from "@/app/moleculer.config";
import { NextResponse } from "next/server";

export async function GET() {
    try {

    if(!broker.started) {
    await broker.start()
}

    const todos = await broker.call('todos.list');
    return NextResponse.json(todos, {status: 200})
    } catch(error) {
        return NextResponse.json(error, {status: 500})
    }
}