// src/app/api/teachers/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const teachers = await prisma.teachers.findMany({
      select: {
        first_name: true,
        surname: true,
      },
    });

    return NextResponse.json(teachers);
  } catch (err) {
    console.error("Failed to fetch subjects", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
