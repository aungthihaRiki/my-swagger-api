import { NextResponse } from "next/server";
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
