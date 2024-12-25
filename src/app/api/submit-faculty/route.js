import { NextResponse } from "next/server";
import fs from 'fs/promises';
import partitionBatches from "@/utils/partition-batches";

export async function POST(req){
    try {
        const body = await req.json();
        const facultyData = body.facultyData;

        if(!Array.isArray(facultyData) || facultyData.length === 0){
            return NextResponse.json({ message: 'Invalid course data' }, { status: 400 });
        }

        console.log('Received faculty data', facultyData);

        for(let i=0; i<facultyData.length; i++){
            facultyData[i].preferredCourses = partitionBatches(facultyData[i].preferredCourses);
        }

        const filePath = "./src/data/faculties.json";
        await fs.writeFile(filePath, JSON.stringify(facultyData, null, 4));
        console.log("Faculty data saved to 'data/faculties.json'");

        return NextResponse.json({message: 'Course data received successfully'}, {status: 200});
    }
    catch(e) {
        console.log(e.message);
        return NextResponse.json({ message: 'Internal Server Error', error: e.message}, { status: 500 });
    }
}