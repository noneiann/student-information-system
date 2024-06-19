import React, { useEffect, useState } from "react";
import "./CoursePage.css";
import Table from "./courseTable.jsx";
import { Button } from "../../Button.jsx";
import { CreateCourse } from "./CreateCourse.jsx";
import axios from "axios";
import { EditCourse } from "./editCourse.jsx";

export default function CoursesPage({
	courses,
	setCourses,
	students,
	setStudents,
	triggerStudentUpdate,
}) {
	const [createCourseOpen, setcreateCourseOpen] = useState(false);
	const [editCourseOpen, setEditCourseOpen] = useState(false);

	const [courseToDelete, setCourseToDelete] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchOption, setSearchOption] = useState("courseCode");
	const [sortOrder, setSortOrder] = useState({ column: null, direction: null });
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const [courseToEdit, setCourseToEdit] = useState(null);
	const handleAddCourse = (newCourseData) => {
		courseToEdit === null
			? setCourses([...courses, newCourseData])
			: setCourses(
					courses.map((currCourse, idx) => {
						if (idx !== courseToEdit) return currCourse;

						const updatedStudents = students.map((student) => {
							if (
								student.courseCode === currCourse.courseCode &&
								student.courseName === currCourse.courseName
							) {
								return {
									...student,
									courseCode: newCourseData.courseCode,
									courseName: newCourseData.courseName,
								};
							}
							return student;
						});

						setStudents(updatedStudents);

						return newCourseData;
					})
				);
	};

	const handleDeleteCourse = async (targetIndex) => {
		const courseToDelete = currentCourses[targetIndex];
		const originalIndex = courses.findIndex(
			(course) => course === courseToDelete
		);

		if (originalIndex !== -1) {
			const deletedCourse = courses[originalIndex];
			const updatedCourses = courses.filter((_, idx) => idx !== originalIndex);
			setCourses(updatedCourses);

			const updatedStudents = students.map((student) => {
				if (
					student.courseCode === deletedCourse.courseCode &&
					student.courseName === deletedCourse.courseName
				) {
					return {
						...student,
						courseCode: "",
						courseName: "",
						enrollmentStatus: "Not Enrolled",
					};
				}
				return student;
			});

			setStudents(updatedStudents);
			try {
				await axios.delete(`/api/delete-course/${courseToDelete.courseCode}`);
				console.log(JSON.stringify(courseToDelete) + " deleted");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleEditCourse = (targetIndex) => {
		const courseToEdit = currentCourses[targetIndex];
		const originalIndex = courses.findIndex(
			(course) => course === courseToEdit
		);

		if (originalIndex !== -1) {
			setCourseToEdit(originalIndex);
			setEditCourseOpen(true);
		}
	};
	const handleSort = (column) => {
		let direction;
		if (sortOrder.column === column && sortOrder.direction === "asc") {
			direction = "desc";
		} else {
			direction = "asc";
		}
		setSortOrder({ column, direction });
	};

	const filteredCourses = courses.filter((course) =>
		course[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedCourses = filteredCourses.sort((a, b) => {
		if (sortOrder.column === null) {
			return 0;
		} else if (a[sortOrder.column] < b[sortOrder.column]) {
			if (sortOrder.direction === "asc") {
				return -1;
			} else return 1;
		} else if (a[sortOrder.column] > b[sortOrder.column]) {
			if (sortOrder.direction === "asc") {
				return 1;
			} else return -1;
		} else return 0;
	});

	const [coursesPerPage] = useState(7);
	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = sortedCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse
	);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	return (
		<div className='courses'>
			<div className='courseHeader'>
				<h1>Student Information System</h1>
			</div>
			<div className='courseTop'>
				<div className='courseLabel'>
					<p>Courses</p>
				</div>

				<div className='btns'>
					<div className='courseSearch-container'>
						<input
							className='searchTerm'
							type='text'
							placeholder='Search'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<select
							type='text'
							className='searchOption'
							id='course'
							name='course'
							onChange={(e) => {
								setSearchOption(e.target.value);
							}}>
							<option value='courseCode' defaultValue>
								Course Code
							</option>
							<option value='courseName'>Course Name</option>
						</select>
					</div>

					<Button
						children='Add a Course'
						buttonSize='btn--medium'
						buttonStyle='btn--outline'
						onClick={() => {
							setCourseToEdit(null);
							setcreateCourseOpen(true);
						}}
					/>
				</div>
			</div>
			<Table
				courses={currentCourses}
				deleteCourse={handleDeleteCourse}
				editCourse={handleEditCourse}
				handleSort={handleSort}
				sortOrder={sortOrder}
			/>
			{createCourseOpen && (
				<CreateCourse
					onSubmit={handleAddCourse}
					defaultValue={courseToEdit !== null && courses[courseToEdit]}
					closeUser={() => {
						setcreateCourseOpen(false);
					}}
					courses={courses}
				/>
			)}
			{editCourseOpen && (
				<EditCourse
					onSubmit={handleAddCourse}
					defaultValue={courseToEdit !== null && courses[courseToEdit]}
					closeUser={() => {
						setEditCourseOpen(false);
					}}
					courses={courses}
				/>
			)}

			<div className='pagination'>
				<button
					className={`page-buttons ${currentPage === 1 ? "disabled" : ""}`}
					onClick={handlePrevPage}
					disabled={currentPage === 1}>
					Prev
				</button>
				{Array.from(
					{ length: Math.ceil(filteredCourses.length / coursesPerPage) },
					(_, i) => (
						<button
							key={i}
							className={`page-buttons ${currentPage === i + 1 ? "active" : ""}`}
							disabled={currentPage === i + 1}
							onClick={() => handlePageChange(i + 1)}>
							{i + 1}
						</button>
					)
				)}
				<button
					className={`page-buttons ${currentPage === Math.ceil(filteredCourses.length / coursesPerPage) ? "disabled" : ""}`}
					onClick={handleNextPage}
					disabled={
						currentPage === Math.ceil(filteredCourses.length / coursesPerPage)
					}>
					Next
				</button>
			</div>
			{confirmationModalOpen && (
				<div className='modal'>
					<div className='modal-content'>
						<p>Are you sure you want to delete this course?</p>
						<div className='modal-buttons'>
							<Button
								onClick={() => {
									handleDeleteCourse(courseToDelete);
									setConfirmationModalOpen(false);
								}}>
								Yes
							</Button>
							<Button onClick={() => setConfirmationModalOpen(false)}>
								No
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
