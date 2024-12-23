
import TextInput from "./TextInput";
import { useState } from "react";

const FacultyDataInput = ({faculties, setFaculties, courses}) => {
    const [facultyName, setFacultyName] = useState('');
    const [prefCourses, setPrefCourses] = useState([]);
    const [courseCode, setCourseCode] = useState('');

    const addFacultyData = (e) => {
        if(!facultyName) {
            alert("Please enter faculty name");
            return;
        }
        e.preventDefault();
        const faculty = {
            name: facultyName,
            abbreviation: getAbbreviation(facultyName),
            preferredCourses: prefCourses,
        };
        
        setFaculties(prev => [...prev, faculty]);
        setPrefCourses([]);
        setFacultyName('');
    }

    function addCourseWithValidation(course){
        const courseExists = prefCourses.some(existingCourse => existingCourse.code === course.code);

        if(courseExists){
            const message = "Course code " + course.code + " already added!";
            alert(message);
        } else {
            setPrefCourses(prev => [...prev, course]);
        }
    }

    const addPrefCourse = () => {
        if(!courseCode) {
            alert('Please enter course code');
            return;
        }
        let courseFound = false;
        courses.forEach(course => {
            let code = course.code;
            // match for lab and lecture
            if(code === courseCode){
                courseFound = true;
                addCourseWithValidation(course)
            }

            // match for tutorial
            let tutCode = courseCode;
            if(tutCode.includes('(P)')){
                tutCode = tutCode.replace('(P)', '(T)');
                if(code == tutCode){
                    courseFound = true;
                    addCourseWithValidation({...course,sem: course.sem, code: course.code});
                }
            }
        });
        if(!courseFound){
            alert("Course with given course code doesn't exist");
            return;
        }
        setCourseCode('');
    }

    function getAbbreviation(name) {
        const words = name.split(' ');
        const abbreviation = words.map(word => word.charAt(0).toUpperCase()).join('');
        return abbreviation;
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <h4 className="text-2xl font-bold">Fill Faculties Data</h4>
            {prefCourses.length > 0 &&
            <table>
                <thead>
                    <tr>
                        <th>Sem</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {prefCourses.map((course, index) => (
                        <tr key={index}>
                            <td>{course.sem}</td>
                            <td>{course.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            <div className="flex flex-col gap-2">
                <TextInput
                    label="Faculty name" 
                    value={facultyName} setValue={setFacultyName}
                    placeholder="Enter name without pronouns"
                />
                <TextInput 
                    label="Preferred Course Code"
                    value={courseCode} setValue={setCourseCode}
                    placeholder="Choose from table below (Tutorial is included in Lab)"
                />
                <button
                    onClick={addPrefCourse}
                    className="py-2 px-4 self-end bg-green-600 hover:opacity-80 text-white rounded w-fit"
                >Add Course +</button>
            </div>
            <button 
                className="py-2 px-4 bg-black text-white rounded-lg hover:opacity-80"
                onClick={addFacultyData}
            >Add Faculty +</button>
        </div>
    )
}

export default FacultyDataInput;