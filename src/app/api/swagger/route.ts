import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger/swagger';

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
