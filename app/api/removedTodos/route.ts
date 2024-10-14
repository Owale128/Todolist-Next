import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) { 
    try {
        const body = await req.json(); 
        const { id } = body;
        
        if(!id) {
            return NextResponse.json({error: 'ID is required'}, {status: 400})
        }

        const removedTodo = await broker.call('remove.todo', {id})

        return NextResponse.json(removedTodo, {status: 200})
    } catch (error) {  
        return NextResponse.json(error, {status: 500})
    }
}