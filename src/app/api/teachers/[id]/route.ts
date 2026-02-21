import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // ✅ Fetch Teacher Info
    const teacher = await prisma.teachers.findUnique({
      where: { teacher_id: id },
    });

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    // ✅ Fetch teacher subjects with grades in one go
    const teacherSubjects = await prisma.teacherSubjects.findMany({
      where: { teacher_id: id },
      include: {
        Subjects: {
          include: {
            Grades: true,
          },
        },
      },
    });

    const subjectCount = teacherSubjects.length;

    // ✅ Count grades taught by teacher
    const gradeCount = new Set(teacherSubjects.map(ts => ts.Subjects.grade_id)).size;

    // ✅ Count students per subject using GROUP BY instead of N+1 queries
    const studentCounts = await prisma.studentSubjects.groupBy({
      by: ['subject_id'],
      where: {
        subject_id: { in: teacherSubjects.map(ts => ts.subject_id) },
        status: true,
      },
      _count: { subject_id: true },
    });

    const studentCountMap = studentCounts.reduce((map, item) => {
      map[item.subject_id] = item._count.subject_id;
      return map;
    }, {} as Record<string, number>);

    // ✅ Calculate teacher portion total and total student count
    let totalTeacherPortion = 0;
    let totalStudentCount = 0;

    const subjectsWithStudentCounts = teacherSubjects.map(ts => {
      const studentCount = studentCountMap[ts.subject_id] || 0;
      const portion = parseFloat(ts.Subjects.teacher_portion.toString()) * studentCount;

      totalTeacherPortion += portion;
      totalStudentCount += studentCount;

      return {
        subject_id: ts.subject_id,
        subject_name: ts.Subjects.subject_name,
        grade_id: ts.Subjects.grade_id,
        assigned_date: ts.assigned_date,
        teacher_portion: ts.Subjects.teacher_portion,
        status: ts.status,
        grade: ts.Subjects.Grades,
        studentCount,
        Sum_teacher_portion: portion,
      };
    });

    // ✅ Calculate balance for current month
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

    const paymentsThisMonth = await prisma.studentPayments.groupBy({
      by: ['subject_id'],
      where: {
        subject_id: { in: teacherSubjects.map(ts => ts.subject_id) },
        month_id: currentMonthName,
      },
      _count: { subject_id: true },
    });

    const paymentCountMap = paymentsThisMonth.reduce((map, item) => {
      map[item.subject_id] = item._count.subject_id;
      return map;
    }, {} as Record<string, number>);

    let balanceForCurrentMonth = 0;

    teacherSubjects.forEach(ts => {
      const studentPaymentsCount = paymentCountMap[ts.subject_id] || 0;
      const portion = parseFloat(ts.Subjects.teacher_portion.toString()) * studentPaymentsCount;
      balanceForCurrentMonth += portion;
    });

    // ✅ Fetch teacher payment history
    const teacherPayments = await prisma.teacherPayments.findMany({
      where: { teacher_id: id },
    });

    // ✅ Final response
    return NextResponse.json({
      teacher,
      stats: {
        subjectCount,
        gradeCount,
        totalStudentCount,
        totalTeacherPortion,
        balanceForCurrentMonth,
      },
      subjects: subjectsWithStudentCounts,
      payments: teacherPayments,
    });

  } catch (err) {
    console.error('Failed to fetch teacher', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
