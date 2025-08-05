import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await prisma.contact.count(); // just test connection
    return NextResponse.json({ message: `Database OK, count: ${count}` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
