import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: List of contacts
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */

import { prisma } from "@/lib/prisma";

export async function GET() {
  const contacts = await prisma.contact.findMany();
  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, phone, email } = await req.json();
    console.log(" contact data");
    console.log({ firstName, lastName, phone, email });
    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const contact = await prisma.contact.create({
      data: { firstName, lastName, phone, email },
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const contact = await prisma.contact.delete({ where: { id } });
    return NextResponse.json(contact, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }

}
