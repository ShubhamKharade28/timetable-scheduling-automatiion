import { getHours } from "./course-utils";

// Function to distribute courses
function distributeCourses(courses, faculties) {
    // Helper functions
    const facultyByCode = (facultyCode) => faculties.find(faculty => faculty.abbreviation == facultyCode) || null;
    const courseByCode = (courseCode) => courses.find(course => course.code == courseCode) || null;

    // STEP 1: Creating a map to store eligible faculties of each course
    const eligibleFaculty = {};
    for(let course of courses){
        eligibleFaculty[course.code] = [];
    }

    for(let faculty of faculties){
        for(let preferredCourse of faculty.preferredCourses){
            const courseCode = preferredCourse.code;
            eligibleFaculty[courseCode].push(faculty.abbreviation);
        }
    }

    // STEP 2: Method for choosing a optimal faculty from eligible faculties
    const facultyFor = {};
    const totalHours = {};
    const maxHours = {};
    const batchAssignments = {};

    courses.forEach(course => { facultyFor[course.code] = null } );
    faculties.forEach(faculty => { 
        totalHours[faculty.abbreviation] = 0;
        maxHours[faculty.abbreviation] = faculty.maxHours || 18;
    });

    const chooseFaculty = (facultyList) => {
        let maxRemHours = 0;
        let res = null;
        for(let facultyCode of facultyList){
            const remHours = maxHours[facultyCode] - totalHours[facultyCode];
            if(remHours > maxRemHours){
                maxRemHours = remHours;
                res = facultyCode;
            }
        }
        return res;
    }

    const extractCourseAndBatch = (courseCode) => {
        const match = courseCode.match(/^(.*)\s\((P|T)\)-([A-Z])$/);
        if (match) {
            const courseName = match[1].trim();
            const batch = match[3];
            return { courseName, batch };
        }
        return { courseName: null, type: null, batch: null };
    };
    
    // STEP 3: Assigning eligible faculties to courses
    for(let courseCode in eligibleFaculty){    
        const facultyList = eligibleFaculty[courseCode];
        const { courseName, batch } = extractCourseAndBatch(courseCode);

        // if it's a lab or tutorial and batch is already assigned, use the same faculty
        if (batch && courseName && batchAssignments[courseName]?.[batch]) {
            const assignedFaculty = batchAssignments[courseName][batch];
            if (facultyList.includes(assignedFaculty)) {
                facultyFor[courseCode] = assignedFaculty;
                totalHours[assignedFaculty] += getHours(courseByCode(courseCode));
                continue;
            }
        }

        // otherwise assign normally
        const choosenFaculty = chooseFaculty(facultyList);
        if(choosenFaculty){
            facultyFor[courseCode] = choosenFaculty;
            totalHours[choosenFaculty] += getHours(courseByCode(courseCode));

            if (batch && courseName) {
                if (!batchAssignments[courseName]) {
                    batchAssignments[courseName] = {};
                }
                batchAssignments[courseName][batch] = choosenFaculty;
            }
        }
    }

    // STEP 4: Assign faculties to unassigned courses
    for (let courseCode in facultyFor) {
        if (!facultyFor[courseCode]) { // If course is unassigned
            const allFaculties = Object.keys(totalHours);
            let leastHoursFaculty = allFaculties.reduce((minFaculty, currentFaculty) => {
                return totalHours[currentFaculty] < totalHours[minFaculty] ? currentFaculty : minFaculty;
            });
    
            // Assign to the faculty with the least hours
            facultyFor[courseCode] = leastHoursFaculty;
            totalHours[leastHoursFaculty] += getHours(courseByCode(courseCode));
        }
    }
    
    // STEP 5: Invert the mappings (faculty: [list of courses])
    const coursesForFaculty = {};
    for (let courseCode in facultyFor) {
        const faculty = facultyFor[courseCode];
        if (!coursesForFaculty[faculty]) {
            coursesForFaculty[faculty] = [];
        }
        coursesForFaculty[faculty].push(courseCode);
    }

    return {
        taskDone: 'STEP 5 : Course distribution with faculty to courses mappings',
        coursesForFaculty,
    };
}

export default distributeCourses;