import React, { useState } from 'react'
import '../../../styles/courseTable.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';


const Table = ({ courses, deleteCourse, editCourse, handleSort, sortOrder }) => {
  return (
    <div className='courseTable-wrapper'>
      <table id='courseTable' className='courseTable table-striped'>
        <thead>
          <tr>
            <th onClick={() => handleSort('courseCode')}>Course Code {sortOrder.column === 'courseCode' && (<span>{sortOrder.direction ==='asc' ? <FontAwesomeIcon icon={faArrowAltCircleUp} style={{color: "#d1d1d1",}} /> : <FontAwesomeIcon icon={faArrowAltCircleDown} style={{color: "#d1d1d1",}} />}</span>)}</th>
            <th onClick={() => handleSort('courseName')}>Course Name {sortOrder.column === 'courseName' && (<span>{sortOrder.direction ==='asc' ? <FontAwesomeIcon icon={faArrowAltCircleUp} style={{color: "#d1d1d1",}} /> : <FontAwesomeIcon icon={faArrowAltCircleDown} style={{color: "#d1d1d1",}} />}</span>)}</th>
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
