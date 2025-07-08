// tests/testWorkloadDistribution.js
import { loadCourses, loadFaculty } from './utils/dataLoader.js';
import { saveJsonToFile } from './utils/jsonUtils.js';

import { distributeWorkload } from './services/workloadService.js';
import { generateTimetable } from './services/schedulerService.js';

try {
	// 1. Load courses and faculites data
	const courses = await loadCourses('../data/courses.json');
	const faculties = await loadFaculty('../data/faculties.json');

	// 1.1 Log the loaded data
	console.log("Loaded courses:", courses.length);
	console.log("Loaded faculties:", faculties.length);

	// 2. Get workload distribution using courses & faculties
	const distribution = await distributeWorkload(courses, faculties);

	// 2.1 Store the distribution to json file
	saveJsonToFile(distribution, "workload_distribution", "outputs");

	// 3. Get the week schedule/timetable using scheduler service
	const timetable = await generateTimetable(courses, faculties, distribution);

	// 3.1 Store the timetable to the json file
	saveJsonToFile(timetable, "timetable", "outputs");
} catch (error) {
	console.error("Error:", error);
	// const solution = (await model.invoke("Give solution for this error:\n, " + error)).content;
    // console.log("Solution: \n", solution);
}