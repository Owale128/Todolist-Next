import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {   
     try {

        const body = await req.json(); 
        const { id } = body;

        if(!id) {
            return NextResponse.json({ error: 'Todo ID is required'}, {status: 400})
        }

    const toggleTodo = await broker.call('toggle.todo', {id: Number(id)}) 

     return NextResponse.json(toggleTodo, {status: 200})

    } catch (error) {

        return NextResponse.json(error, {status: 500})
    }
}