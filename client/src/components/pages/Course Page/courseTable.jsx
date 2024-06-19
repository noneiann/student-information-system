import React, { useState } from "react";
import "../../../styles/courseTable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPencil,
	faTrash,
	faArrowAltCircleUp,
	faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const Table = ({
	courses,
	deleteCourse,
	editCourse,
	handleSort,
	sortOrder,
}) => {
	const [courseToDelete, setCourseToDelete] = useState(null);
	const handleDeleteConfirmation = (idx) => {
		setCourseToDelete(idx);
	};

	const handleDeleteCourse = () => {
		deleteCourse(courseToDelete);
		setCourseToDelete(null);
	};
	return (
		<div className='courseTable-wrapper'>
			<table id='courseTable' className='courseTable table-striped'>
				<thead>
					<tr>
						<th onClick={() => handleSort("courseCode")}>
							Course Code{" "}
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
						<th className='expand' onClick={() => handleSort("courseName")}>
							Course Name{" "}
							{sortOrder.column === "courseName" && (
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
						<th className='expand' onClick={() => handleSort("description")}>
							Course Description{" "}
							{sortOrder.column === "description" && (
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
					{courses.length === 0 ? (
						<tr>
							<td colSpan='4'>No Courses Found</td>
						</tr>
					) : (
						courses.map((c, idx) => (
							<tr key={idx}>
								<td>{c.courseCode}</td>
								<td>{c.courseName}</td>
								<td>{c.description}</td>
								<td>
									<span>
										<FontAwesomeIcon
											className='action-icon'
											icon={faPencil}
											onClick={() => editCourse(idx)}
											style={{ color: "#ffffff" }}
										/>
										<FontAwesomeIcon
											className='action-icon'
											onClick={() => handleDeleteConfirmation(idx)}
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
			{courseToDelete !== null && (
				<>
					<div className='overlay'></div>
					<div className='confirmation-modal'>
						<p>Are you sure you want to delete this course?</p>
						<button onClick={handleDeleteCourse}>Confirm</button>
						<button className='cancel' onClick={() => setCourseToDelete(null)}>
							Cancel
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Table;
