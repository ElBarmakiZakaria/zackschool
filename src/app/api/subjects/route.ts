// src/app/api/subjects/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const subjects = await prisma.subjects.findMany({
      select: {
        subject_id: true,
        subject_name: true,
        grade_id: true,
      },
    });

    return NextResponse.json(subjects);
  } catch (err) {
    console.error("Failed to fetch subjects", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
