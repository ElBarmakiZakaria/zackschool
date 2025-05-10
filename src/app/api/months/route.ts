// src/app/api/months/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const months = await prisma.months.findMany({
      select: {
        month_id: true,
      },
    });

    return NextResponse.json(months);
  } catch (err) {
    console.error("Failed to fetch months", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
