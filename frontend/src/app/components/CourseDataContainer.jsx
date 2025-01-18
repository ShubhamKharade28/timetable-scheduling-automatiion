
import toRoman from "@/utils/toroman";
import partitionCourses from "@/utils/partition-courses";
import partitionBatches from "@/utils/partition-batches";

const CourseDataContainer = ({courses, removeCourse}) => {
    const submitCourseData = async (e) => {
        e.preventDefault();

        // partition the course data into lectures, labs, and tutorials
        const partionedCourseData = partitionCourses(courses);
        const batchPartitionedCourseData = partitionBatches(partionedCourseData);

        const requestBody = JSON.stringify({
            courseData: batchPartitionedCourseData,
        });

        const res = await fetch('/api/submit-courses', {
            body: requestBody,
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        const result = await res.json();
        console.log(result);
    }
    return (
        <div className="flex flex-col gap-2 items-end justify-start">
            <button 
                onClick={submitCourseData}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-bold"
            >Submit Course Data</button>
            <table>
                <thead>
                    <tr>
                        <th>Sem</th>
                        <th>Course</th>
                        <th>L</th>
                        <th>T</th>
                        <th>P</th>
                        <th>Batches</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => {
                        const {sem, partOfElective, courseName, code, lectures, tutorials, labs, batches} = course;
                        return (
                            <tr key={code}>
                                <td>{toRoman(sem)}</td>
                                <td>{courseName}</td>
                                <td>{lectures > 0 ? lectures : ''}</td>
                                <td>{tutorials > 0 ? tutorials : ''}</td>
                                <td>{labs > 0 ? labs : ''}</td>
                                <td>{batches > 1 ? batches : ''}</td>
                                <td className="text-red-600 text-xl font-semibold hover:text-red-800">
                                    <button onClick={() => removeCourse(courseName)}>x</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CourseDataContainer;