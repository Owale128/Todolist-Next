import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL (req.url)
    const id = searchParams.get('id')

    try {
        if(!broker.started) {
           await broker.start()
        }
    
    if(!id) {
        return NextResponse.json({error: 'ID is required'}, {status: 401})
    }
    
        const removedTodo = await broker.call('remove.todo', {id: Number(id)})
        return NextResponse.json(removedTodo, {status: 201})
    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}