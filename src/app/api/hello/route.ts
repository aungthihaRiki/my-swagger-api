import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a Hello World message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export async function GET() {
  return NextResponse.json({ message: 'Hello world' }, { status: 200 });
}
