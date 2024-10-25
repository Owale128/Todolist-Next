import broker from "@/app/moleculer.config";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        
        const { username, password } = await req.json()

        if(!username || !password){
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400})
        }

        const result = await broker.call('login.user', { username, password })

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Login failed', error}, { status: 500 })
    }
}