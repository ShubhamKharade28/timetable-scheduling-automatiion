
import toRoman from "@/utils/toroman";

const FacultyDataContainer = ({faculties, setFaculties}) => {
    return (
        <div className="w-1/2 flex flex-col gap-5 h-screen overflow-scroll">
            <button 
                // onClick={submitCourseData}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-bold w-fit self-end"
            >Submit Faculty Data</button>
            <h4 className="text-2xl font-bold">Faculties</h4>
            <table>
                <thead>
                    <tr>
                        <th>Faculty</th>
                        <th>Sem</th>
                        <th>Course Code</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.length > 0 &&
                        faculties.map(faculty => {
                            const { name, preferredCourses } = faculty;
                            const totalPrefs = preferredCourses.length;
                            return preferredCourses.map((course, index) => (
                                <tr key={course+index}>
                                    {index == 0 && <td rowSpan={totalPrefs}>{name}</td>}
                                    <td>{toRoman(course.sem)}</td>
                                    <td>{course.code}</td>
                                </tr>
                            ))
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default FacultyDataContainer;