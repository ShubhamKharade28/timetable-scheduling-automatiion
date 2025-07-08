import { promises as fs } from 'fs';
import { Course } from '../models/Course.js';
import { Faculty } from '../models/Faculty.js';

export async function loadCourses(jsonPath) {
  const fileContent = await fs.readFile(jsonPath, 'utf-8');
  const data = JSON.parse(fileContent);

  return data;

//   return data.map(courseData => {
//     const course = new Course(courseData);
//     course.validate();
//     return course;
//   });
}

export async function loadFaculty(jsonPath) {
  const fileContent = await fs.readFile(jsonPath, 'utf-8');
  const data = JSON.parse(fileContent);

  return data;

//   return data.map(facultyData => {
//     const faculty = new Faculty(facultyData);
//     faculty.validate();
//     return faculty;
//   });
}