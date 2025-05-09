// src/app/api/grades/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const grades = await prisma.grades.findMany({
      select: {
        grade_id: true,
      },
    });

    return NextResponse.json(grades);
  } catch (err) {
    console.error("Failed to fetch grades", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
