import { courseTypes } from "./courses";

export default function partitionCourses(coursesCombined){
    let coursesPartitioned = [];
    coursesCombined.forEach(course => {
        const lectureCourse = {
            sem: course.sem,
            courseName: course.courseName,
            code: course.code,
            type: courseTypes.lecture,
            value: +course.lectures,
            batches: 1,
        };
        coursesPartitioned.push(lectureCourse);
        
        if(course.labs > 0){
            const labCourse = {
                sem: course.sem,
                courseName: course.courseName + " Lab",
                code: course.code + " (P)",
                type: courseTypes.lab,
                value: +course.labs,
                batches: +course.batches,
            };
            coursesPartitioned.push(labCourse);
        }

        if(course.tutorials > 0){
            const tutorialCourse = {
                sem: course.sem,
                courseName: course.courseName + " Tutorial",
                code: course.code + " (T)",
                type: courseTypes.tutorial,
                value: +course.tutorials,
                batches: +course.batches,
            }
            coursesPartitioned.push(tutorialCourse);
        }
    });
    return coursesPartitioned;
}