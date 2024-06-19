import "./App.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StudentsPage from "./components/pages/Students Page/StudentsPage.jsx";
import CoursesPage from "./components/pages/Course Page/CoursesPage.jsx";
import axios from "axios";

function App() {
	const [isMenuActive, setIsMenuActive] = useState(false);
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const addCourseName = (students, courses) => {
		return students.map((student) => {
			const course = courses.find(
				(course) => course.courseCode === student.courseCode
			);
			return {
				...student,
				courseName: course ? course.courseName : "Unknown",
			};
		});
	};

	const readDatabase = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api");
			const updatedStudents = addCourseName(
				response.data.students,
				response.data.courses
			);
			setStudents(updatedStudents);
			setCourses(response.data.courses);
		} catch (error) {
			console.error("Error reading SQL file:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		readDatabase();
	}, []);

	return (
		<div className='App'>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<Router>
						<Sidebar setIsMenuActive={setIsMenuActive} />
						<div
							className={
								isMenuActive ? "active-content" : "non-active-content"
							}>
							<Routes>
								<Route
									path='/'
									element={
										<StudentsPage
											courses={courses}
											setCourses={setCourses}
											students={students}
											setStudents={setStudents}
										/>
									}
								/>
								<Route
									path='/courses'
									element={
										<CoursesPage
											courses={courses}
											setCourses={setCourses}
											students={students}
											setStudents={setStudents}
										/>
									}
								/>
							</Routes>
						</div>
					</Router>
				</>
			)}
		</div>
	);
}

export default App;
