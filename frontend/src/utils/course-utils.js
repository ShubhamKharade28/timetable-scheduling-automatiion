
import courses from '@/data/courses.json';

const allCourses = courses;

export function getCourseByCode(courseCode,courses=allCourses) {
    return courses.find(course => course.code === courseCode) || null;
}

export function getCoursesByCodes(courseCodes, courses=allCourses) {
    return courseCodes
        .map((code) => getCourseByCode(code,courses))
        .filter((course) => course !== null);
}

export const courseTypes = {
    lecture: 'lecture',
    tutorial: 'tutorial',
    lab: 'lab',
};

export const getHours = (course) => {
    let res = course.value;
    if(course.type == courseTypes.lab || course.type == courseTypes.tutorial) res *= 2;
    return res;
}