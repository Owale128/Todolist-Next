import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {   
     try {

        const body = await req.json(); 
        const { id } = body;

        if(!id) {
            return NextResponse.json({ error: 'Todo ID is required'}, {status: 400})
        }
        
    const toggledTodo = await broker.call('toggle.todo', {id}) 

     return NextResponse.json(toggledTodo, {status: 200})

    } catch (error) {

        return NextResponse.json(error, {status: 500})
    }
}