import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    // ตรวจสอบข้อมูลที่จำเป็น
    if (
      !body.firstName ||
      !body.lastName ||
      !body.school ||
      !body.grade ||
      !body.examCenter
    ) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าเลือกอย่างน้อย 1 วิชา
    const hasSubject = Object.values(body.subjects).some((value) => value);
    if (!hasSubject) {
      return NextResponse.json(
        { error: "กรุณาเลือกอย่างน้อย 1 วิชา" },
        { status: 400 }
      );
    }

    // บันทึกข้อมูลลงฐานข้อมูล
    const registration = await prisma.registration.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        school: body.school,
        grade: body.grade,
        examCenter: body.examCenter,
        subjects: body.subjects, // Prisma จะแปลง object เป็น JSON โดยอัตโนมัติ
        status: "รอการชำระเงิน",
      },
    });

    console.log("Created registration:", registration); // เพิ่ม log เพื่อตรวจสอบ

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" },
      { status: 500 }
    );
  }
}
