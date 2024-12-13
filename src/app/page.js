"use client";
import { useEffect, useState } from "react";
import CourseDataInput from "./components/CourseDataInput";
import CourseDataContainer from "./components/CourseDataContainer";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [sem, setSem] = useState('');
  const [partOfElective, setPartOfElective] = useState('');
  const [courseName, setCourseName] = useState('');
  const [code, setCode] = useState('');
  const [lectures, setLectures] = useState('');
  const [tutorials, setTutorials] = useState('');
  const [labs, setLabs] = useState('');
  const [batches, setBatches] = useState('');
  const [firstRender, setFirstRender] = useState(true);
  // const [hours, setHours] = useState('');

  useEffect(() => {
    if(firstRender) return;
    saveCourseData();
  }, [courses]);

  useEffect(() => {
    getSavedCourseData();
    setFirstRender(false);
  },[]);

  const getSavedCourseData = async () => {
    let savedCourseData = localStorage.getItem('courses');
    if(savedCourseData){
      savedCourseData = await JSON.parse(savedCourseData);
      setCourses(savedCourseData);
    }
  }

  const saveCourseData = () => {
    let courseData = JSON.stringify(courses);
    localStorage.setItem('courses', courseData);
  }

  const resetCourseData = () => {
    setPartOfElective('');
    setCourseName('');
    setCode('');
    setLectures('');
    setTutorials('');
    setLabs('');
    setBatches('');
  }

  const removeCourse = (courseToRemove) => {
    let newCourses = courses.filter(course => course.courseName !== courseToRemove);
    console.log(newCourses);
    setCourses(newCourses);
  }

  const addCourseData = (e) => {
    e.preventDefault();
    const course = {
      sem,
      partOfElective,
      courseName,
      code,
      lectures: lectures ? lectures : 0,
      tutorials: tutorials ? tutorials : 0,
      labs: labs ? labs : 0,
      batches: batches ? batches : 1,
    };

    setCourses((prev) => [...prev, course]);
    resetCourseData();
  }

  return (
    <main className="py-20 px-28 flex items-center justify-center gap-28">
      <CourseDataInput 
        sem={sem}
        setSem={setSem}
        partOfElective={partOfElective}
        setPartOfElective={setPartOfElective}
        courseName={courseName}
        setCourseName={setCourseName}
        code={code}
        setCode={setCode}
        lectures={lectures}
        setLectures={setLectures}
        tutorials={tutorials}
        setTutorials={setTutorials}
        labs={labs}
        setLabs={setLabs}
        batches={batches}
        setBatches={setBatches}
        resetCourseData={resetCourseData}
        addCourseData={addCourseData}
      />
      {courses.length > 0 && 
        <CourseDataContainer 
          courses={courses}
          removeCourse={removeCourse}
        />
      }
    </main>
  )
}

export default Home;