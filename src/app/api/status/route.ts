// src/app/api/grades/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const status =
        [
            {
              "option": "true",
            },
            {
              "option": "false",
            }
          ]


    return NextResponse.json(status);
  } catch (err) {
    console.error("Failed to fetch statuses", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
