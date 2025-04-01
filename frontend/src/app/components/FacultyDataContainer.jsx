
import toRoman from "@/utils/toroman";
import { API_URL } from "../api/constants";
import Link from "next/link";

const FacultyDataContainer = ({faculties, setFaculties}) => {
    const submitCourseData = async (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify({
            facultyData: faculties,
        });

        const response = await fetch(API_URL + 'faculty/submit/', {
            method: 'POST',
            body: requestBody,
            headers: {'Content-Type': 'application/json'}
        });

        const result = await response.json()
        console.log(result);
    }

    const removeFaculty = (name) => {
        setFaculties((prev) => prev.filter(faculty => faculty.name !== name));
    }

    return (
        <div className="w-1/2 flex flex-col gap-5 h-screen overflow-scroll">
            <span className="w-full flex items-end justify-between">
                <h4 className="text-3xl font-bold">Faculties</h4>
                <span className="flex gap-2">
                    <Link
                        href="http://localhost:8000/workload/"
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-bold w-fit"
                    >Get workload distribution</Link>
                    <button 
                        onClick={submitCourseData}
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-bold w-fit"
                    >Submit Faculty Data</button>
                </span>
            </span>
            <table>
                <thead>
                    <tr>
                        <th>Faculty</th>
                        <th>Sem</th>
                        <th>Course Code</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.length > 0 &&
                        faculties.map((faculty) => {
                            const { name, preferredCourses } = faculty;
                            const totalPrefs = preferredCourses.length;
                            return preferredCourses.map((course, index) => (
                                <tr key={course+index}>
                                    {index == 0 && <td rowSpan={totalPrefs}>{name}</td>}
                                    <td>{toRoman(course.sem)}</td>
                                    <td>{course.code}</td>
                                    {index == 0 && 
                                    <td 
                                        rowSpan={totalPrefs}
                                        className="text-red-500 hover:scale-90 font-bold p-1 text-2xl cursor-pointer"
                                        onClick={() => removeFaculty(name)}
                                    >x</td>}
                                </tr>
                            ))
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default FacultyDataContainer;