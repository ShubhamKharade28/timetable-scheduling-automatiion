"use client";
import TextInput from "./TextInput";
import Link from "next/link";

const CourseDataInput = ({
	sem, setSem,
	partOfElective, setPartOfElective,
	courseName, setCourseName,
	code, setCode,
	lectures, setLectures,
	tutorials, setTutorials,
	labs, setLabs,
	batches, setBatches,
	addCourseData
}) => {
  return (
		<div className="w-1/2 flex flex-col gap-5">
			<h1 className="font-bold text-3xl">Enter Course Data</h1>
			<div className="flex flex-col gap-1">
				<TextInput value={sem} setValue={setSem} label="Semester"/>
				<TextInput value={partOfElective} setValue={setPartOfElective} label="Part of Elective"/>
				<TextInput value={courseName} setValue={setCourseName} label="Course Name"/>
				<TextInput value={code} setValue={setCode} label="Code"/>
				<TextInput value={lectures} setValue={setLectures} label="Lectures" type="number"/>
				<TextInput value={tutorials} setValue={setTutorials} label="Tutorials" type="number"/>
				<TextInput value={labs} setValue={setLabs} label="Labs" type="number"/>
				<TextInput value={batches} setValue={setBatches} label="Batches" type="number"/>
			</div>
			<button className="bg-black hover:opacity-70 text-white rounded-lg py-2 px-3 "
				onClick={(e) => addCourseData(e)}
			> ADD + </button>
			<Link
				href="/faculty"
				className="bg-gray-600 hover:opacity-70 text-white rounded-lg py-2 px-3 text-center"
			>Faculty Preference Input &rarr;</Link>
		</div>
	)
}



export default CourseDataInput;