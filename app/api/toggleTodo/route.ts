import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { searchParams} = new URL(req.url)
    const id  = searchParams.get('id') 
    
    try {
        if(!broker.started) {
            await broker.start()
        }
        
        
    if(!id) {
        return NextResponse.json({ error: 'Todo ID is required'})
    }

    const toggleTodo = await broker.call('toggle.todo', {id: Number(id)})
    return NextResponse.json(toggleTodo, {status: 200})
} catch (error) {
    return NextResponse.json(error, {status: 500})
}
}