import React, { useEffect, useState } from "react";
import "./StudentsPage.css";
import Table from "./studentTable.jsx";
import { Button } from "../../Button.jsx";
import { CreateUser } from "./CreateUser.jsx";
import { EditUser } from "./editUser.jsx";
import axios from "axios";

export default function StudentsPage({
	students,
	courses,
	setStudents,
	setCourses,
}) {
	const [createUserOpen, setCreateUserOpen] = useState(false);
	const [editUserOpen, setEditUserOpen] = useState(false);
	const [studentToEdit, setStudentToEdit] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchOption, setSearchOption] = useState("idNumber");
	const [sortOrder, setSortOrder] = useState({ column: null, direction: null });
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredStudents = students.filter((student) =>
		student[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedStudents = filteredStudents.sort((a, b) => {
		if (sortOrder.column === null) {
			return 0;
		} else if (a[sortOrder.column] < b[sortOrder.column]) {
			return sortOrder.direction === "asc" ? -1 : 1;
		} else if (a[sortOrder.column] > b[sortOrder.column]) {
			return sortOrder.direction === "asc" ? 1 : -1;
		} else {
			return 0;
		}
	});

	const handleAddStudent = (newStudentData) => {
		if (studentToEdit === null) {
			setStudents([...students, newStudentData]);
		} else {
			const updatedStudents = [...students];
			updatedStudents[studentToEdit] = newStudentData;
			setStudents(updatedStudents);
		}
		setCreateUserOpen(false);
		setEditUserOpen(false);
		setStudentToEdit(null);
		setIsModalOpen(true);
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

	const handleDeleteStudent = async (targetIndex) => {
		const studentToDelete = currentStudents[targetIndex];
		const originalIndex = students.findIndex(
			(student) => student === studentToDelete
		);

		if (originalIndex !== -1) {
			try {
				await axios.delete(`/api/${studentToDelete.idNumber}`);
			} catch (error) {
				console.error("Error deleting student:", error);
			}
			setStudents(sortedStudents.filter((_, idx) => idx !== originalIndex));
		}
	};

	const handleEditStudent = (targetIndex) => {
		const studentToEdit = currentStudents[targetIndex];
		const originalIndex = students.findIndex(
			(student) => student === studentToEdit
		);

		if (originalIndex !== -1) {
			setStudentToEdit(originalIndex);
			setEditUserOpen(true);
		}
	};

	const [studentsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastStudent = currentPage * studentsPerPage;
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
	const currentStudents = sortedStudents.slice(
		indexOfFirstStudent,
		indexOfLastStudent
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
		<div className='students'>
			{console.log(students)}
			<div className='studentHeader'>
				<h1>Student Information System</h1>
			</div>
			<div className='studentTop'>
				<div className='studentLabel'>
					<p>Students</p>
				</div>

				<div className='btns'>
					<div className='search-container'>
						<input
							className='searchTerm'
							type='text'
							placeholder='Search'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<select
							className='searchOption'
							id='course'
							name='course'
							onChange={(e) => {
								setSearchOption(e.target.value);
							}}>
							<option value='idNumber' defaultValue>
								ID Number
							</option>
							<option value='name'>Name</option>
						</select>
					</div>
					<Button
						children='Add a Student'
						buttonSize='btn--medium'
						buttonStyle='btn--outline'
						onClick={() => {
							setCreateUserOpen(true);
						}}
					/>
				</div>
			</div>
			<Table
				students={currentStudents}
				deleteStudent={handleDeleteStudent}
				editStudent={handleEditStudent}
				handleSort={handleSort}
				sortOrder={sortOrder}
			/>
			{createUserOpen && (
				<CreateUser
					students={students}
					courses={courses}
					onSubmit={handleAddStudent}
					closeUser={() => {
						setCreateUserOpen(false);
						setStudentToEdit(null);
					}}
					defaultValue={studentToEdit !== null && students[studentToEdit]}
				/>
			)}
			{editUserOpen && (
				<EditUser
					students={students}
					courses={courses}
					onSubmit={handleAddStudent}
					closeUser={() => {
						setEditUserOpen(false);
						setStudentToEdit(null);
					}}
					defaultValue={studentToEdit !== null && students[studentToEdit]}
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
					{ length: Math.ceil(sortedStudents.length / studentsPerPage) },
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
					className={`page-buttons ${currentPage === Math.ceil(sortedStudents.length / studentsPerPage) ? "disabled" : ""}`}
					onClick={handleNextPage}
					disabled={
						currentPage === Math.ceil(sortedStudents.length / studentsPerPage)
					}>
					Next
				</button>
			</div>

			{isModalOpen && (
				<>
					<div className='overlay' />
					<div className='confirmation-modal'>
						<p>Student added successfully!</p>
						<button
							onClick={() => {
								setIsModalOpen(false);
							}}>
							Close
						</button>
					</div>
				</>
			)}
		</div>
	);
}
