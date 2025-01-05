
import partitionCourses from "@/utils/partition-courses";
import { NextResponse } from "next/server";
import fs from 'fs/promises';
import partitionBatches from "@/utils/partition-batches";

export async function POST(req){
    try {
        const body = await req.json();
        const courseData = body.courseData;

        if(!Array.isArray(courseData) || courseData.length === 0){
            return NextResponse.json({ message: 'Invalid course data' }, { status: 400 });
        }

        console.log('Received course data', courseData);

        // partition the course data into lectures, labs, and tutorials
        const partionedCourseData = partitionCourses(courseData);
        console.log('partitioned data', partionedCourseData);

        const batchPartitionedCourseData = partitionBatches(partionedCourseData);
        console.log('Batch partitioned course data', batchPartitionedCourseData);

        const filePath = "./src/data/courses.json";
        await fs.writeFile(filePath, JSON.stringify(batchPartitionedCourseData, null, 4));
        console.log("Partitioned course data saved to 'data/courses.json'");

        return NextResponse.json({message: 'Course data received successfully'}, {status: 200});
    }
    catch(e) {
        console.log(e.message);
        return NextResponse.json({ message: 'Internal Server Error', error: e.message}, { status: 500 });
    }
}