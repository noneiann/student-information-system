import React, { useState } from 'react'
import '../../../styles/Table.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Table = ({ courses, deleteCourse, editCourse }) => {
  return (
    <div className='table-wrapper'>
      <table id='studentTable' className='table table-striped'>
        <thead>
          <tr>
            <th key='courseCode'>Course Code</th>
            <th key='courseName'>Course Name</th>
            <th key='description' className='expand'>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5">No Courses Found</td>
            </tr>
          ) : (
            courses.map((c, idx) => (
              <tr key={c.courseCode}>
                <td key={c.courseCode}>{c.courseCode}</td>
                <td key={c.courseName}>{c.courseName}</td>
                <td className='expand' key={c.description}>{c.description}</td>
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

export default Table