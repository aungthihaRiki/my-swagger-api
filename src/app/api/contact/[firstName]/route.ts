import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/contact/{firstName}:
 *   get:
 *     summary: Get a contact by firstName
 *     parameters:
 *       - in: path
 *         name: firstName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact object
 */
export async function GET(
  req: Request,
  { params }: { params: { firstName: string } }
) {
  try {
      const { firstName } = await params;
      console.log("Searching for:", firstName);
    const contact = await prisma.contact.findFirst({
      where: { firstName: firstName },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(contact);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
