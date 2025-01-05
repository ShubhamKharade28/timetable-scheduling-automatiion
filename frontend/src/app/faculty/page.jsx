"use client";

import { useEffect, useState } from "react";
import { courseTypes } from "@/utils/course-utils";
import CourseListContainer from "../components/CourseListContainer";
import FacultyDataInput from "../components/FacultyDataInput";
import FacultyDataContainer from "../components/FacultyDataContainer";
import partitionCourses from "@/utils/partition-courses";

const FacultyPage = () => {
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getSavedCourseData();
    }, [])

    const getSavedCourseData = async () => {
        let savedCourseData = localStorage.getItem('courses');
        if(savedCourseData){
            let coursesCombined = await JSON.parse(savedCourseData);
            console.log('courses combined', coursesCombined);
            const coursesPartitioned = partitionCourses(coursesCombined);
            setCourses(coursesPartitioned);
            console.log('courses partitioned', coursesPartitioned);
        }
    }

    return (
        <main className="w-screen h-screen py-20 px-28 flex flex-col md:flex-row items-start justify-center gap-28">
            <div className="w-1/2 flex flex-col gap-10">
                <FacultyDataInput 
                    faculties={faculties} 
                    setFaculties={setFaculties} 
                    courses={courses}
                />
                <CourseListContainer courses={courses}/>
            </div>
            <FacultyDataContainer faculties={faculties} setFaculties={setFaculties}/>
        </main>
    )
}

export default FacultyPage;