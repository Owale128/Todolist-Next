import broker from "@/app/moleculer.config";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    const todos = await broker.call('list.todo');
    return NextResponse.json(todos, {status: 200})
    } catch(error) { 
        return NextResponse.json(error, {status: 500})
    }
}