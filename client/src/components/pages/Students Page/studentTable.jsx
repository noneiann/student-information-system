import React, { useState } from "react";
import "../../../styles/Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPencil,
	faTrash,
	faArrowAltCircleUp,
	faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const Table = ({
	students,
	deleteStudent,
	editStudent,
	handleSort,
	sortOrder,
}) => {
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const [studentToDelete, setStudentToDelete] = useState(null);

	const openConfirmationModal = (idx) => {
		setStudentToDelete(idx);
		setConfirmationModalOpen(true);
	};

	const closeConfirmationModal = () => {
		setConfirmationModalOpen(false);
	};

	const confirmDeleteStudent = () => {
		deleteStudent(studentToDelete);
		closeConfirmationModal();
	};
	const yearleveldisplay = (yearLevel) => {
		switch (yearLevel) {
			case 1:
				return "1st Year";
			case 2:
				return "2nd Year";
			case 3:
				return "3rd Year";
			case 4:
				return "4th Year";
			case 5:
				return "5th Year";
			default:
				return "N/A";
		}
	};

	return (
		<div className='table-wrapper'>
			<table id='studentTable' className='table table-striped'>
				<thead>
					<tr>
						<th onClick={() => handleSort("idNumber")}>
							{" "}
							ID{" "}
							{sortOrder.column === "idNumber" && (
								<span>
									{sortOrder.direction === "asc" ? (
										<FontAwesomeIcon
											icon={faArrowAltCircleUp}
											style={{ color: "#d1d1d1" }}
										/>
									) : (
										<FontAwesomeIcon
											icon={faArrowAltCircleDown}
											style={{ color: "#d1d1d1" }}
										/>
									)}
								</span>
							)}
						</th>
						<th onClick={() => handleSort("name")}>
							{" "}
							Name{" "}
							{sortOrder.column === "name" && (
								<span>
									{sortOrder.direction === "asc" ? (
										<FontAwesomeIcon
											icon={faArrowAltCircleUp}
											style={{ color: "#d1d1d1" }}
										/>
									) : (
										<FontAwesomeIcon
											icon={faArrowAltCircleDown}
											style={{ color: "#d1d1d1" }}
										/>
									)}
								</span>
							)}
						</th>
						<th className='expand' onClick={() => handleSort("courseCode")}>
							Course{" "}
							{sortOrder.column === "courseCode" && (
								<span>
									{sortOrder.direction === "asc" ? (
										<FontAwesomeIcon
											icon={faArrowAltCircleUp}
											style={{ color: "#d1d1d1" }}
										/>
									) : (
										<FontAwesomeIcon
											icon={faArrowAltCircleDown}
											style={{ color: "#d1d1d1" }}
										/>
									)}
								</span>
							)}
						</th>
						<th onClick={() => handleSort("enrollmentStatus")}>
							Enrollment Status{" "}
							{sortOrder.column === "enrollmentStatus" && (
								<span>
									{sortOrder.direction === "asc" ? (
										<FontAwesomeIcon
											icon={faArrowAltCircleUp}
											style={{ color: "#d1d1d1" }}
										/>
									) : (
										<FontAwesomeIcon
											icon={faArrowAltCircleDown}
											style={{ color: "#d1d1d1" }}
										/>
									)}
								</span>
							)}
						</th>
						<th onClick={() => handleSort("yearLevel")}>
							Year Level{" "}
							{sortOrder.column === "yearLevel" && (
								<span>
									{sortOrder.direction === "asc" ? (
										<FontAwesomeIcon
											icon={faArrowAltCircleUp}
											style={{ color: "#d1d1d1" }}
										/>
									) : (
										<FontAwesomeIcon
											icon={faArrowAltCircleDown}
											style={{ color: "#d1d1d1" }}
										/>
									)}
								</span>
							)}
						</th>
						<th onClick={() => handleSort("gender")}>
							Gender{" "}
							{sortOrder.column === "gender" && (
								<span>
									{sortOrder.direction === "asc" ? (
										<FontAwesomeIcon
											icon={faArrowAltCircleUp}
											style={{ color: "#d1d1d1" }}
										/>
									) : (
										<FontAwesomeIcon
											icon={faArrowAltCircleDown}
											style={{ color: "#d1d1d1" }}
										/>
									)}
								</span>
							)}
						</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{students.length === 0 ? (
						<tr>
							<td colSpan='5'>No Students Found</td>
						</tr>
					) : (
						students.map((s, idx) => (
							<tr key={idx}>
								<td key={s.idNumber}>{s.idNumber}</td>
								<td key={s.name}>{s.name}</td>
								<td className='expand' key={s.courseCode}>
									{s.courseCode && s.courseName
										? `${s.courseCode} ${s.courseName}`
										: "No Course"}
								</td>
								<td key={s.enrollmentStatus}>{s.enrollmentStatus}</td>
								<td key={s.yearLevel}>{yearleveldisplay(s.yearLevel)}</td>
								<td key={s.gender}>{s.gender}</td>
								<td>
									<span>
										<FontAwesomeIcon
											className='action-icon'
											icon={faPencil}
											onClick={() => editStudent(idx)}
											style={{ color: "#ffffff" }}
										/>
										<FontAwesomeIcon
											className='action-icon'
											onClick={() => openConfirmationModal(idx)}
											icon={faTrash}
											style={{ color: "#bd0000" }}
										/>
									</span>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{confirmationModalOpen && (
				<>
					<div className='overlay'></div>
					<div className='confirmation-modal'>
						<div className='modal-content'>
							<p>Are you sure you want to delete this student?</p>
							<div className='modal-buttons'>
								<button onClick={confirmDeleteStudent}>Confirm</button>
								<button className='cancel' onClick={closeConfirmationModal}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Table;
