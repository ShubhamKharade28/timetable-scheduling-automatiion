import toRoman from "@/utils/toroman";

const CourseListContainer = ({courses}) => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h4 className="font-bold text-xl">Course List</h4>
            <table>
                <thead>
                    <tr>
                        <th>Sem</th>
                        <th>Course Name</th>
                        <th>Code</th>
                        <th>Lectures/Labs</th>
                    </tr>
                </thead>
                <tbody>
                {courses.length > 0 && 
                    courses.map((course) => (
                        <tr key={course.courseName}>
                            <td>{toRoman(course.sem)}</td>
                            <td>{course.courseName}</td>
                            <td>{course.code}</td>
                            <td>{course.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CourseListContainer;