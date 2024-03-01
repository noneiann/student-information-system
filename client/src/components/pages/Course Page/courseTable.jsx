import React, { useState } from 'react'
import '../../../styles/courseTable.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Table = ({ courses, deleteCourse, editCourse }) => {
  return (
    <div className='courseTable-wrapper'>
      <table id='courseTable' className='courseTable table-striped'>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th className='expand'>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4">No Courses Found</td>
            </tr>
          ) : (
            courses.map((c, idx) => (
              <tr key={idx}>
                <td>{c.courseCode}</td>
                <td>{c.courseName}</td>
                <td>{c.description}</td>
                <td>
                  <span>
                    <FontAwesomeIcon className='action-icon' icon={faPencil} onClick={() => editCourse(idx)} style={{ color: '#ffffff' }} />
                    <FontAwesomeIcon className='action-icon' onClick={() => deleteCourse(idx)} icon={faTrash} style={{ color: '#bd0000' }} />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
