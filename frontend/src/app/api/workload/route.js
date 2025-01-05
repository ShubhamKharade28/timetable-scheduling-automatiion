import { NextResponse } from "next/server";
import distributeCourses from "@/utils/distribution";
import courses from '@/data/courses.json';
import faculties from '@/data/faculties.json';

export async function GET(req) {
    try {
        const workloadDistribution = distributeCourses(courses, faculties);
        return NextResponse.json({ workloadDistribution }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}