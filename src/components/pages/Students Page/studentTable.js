import React from 'react'
import '../../../styles/Table.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Table = ({ students, deleteStudent, editStudent }) => {
  return (
    <div className='table-wrapper'>
      <table id='studentTable' className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className='expand'>Course</th>
            <th>Year Level</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (<tr>
            <td colSpan='5'>No Students Found</td>
          </tr>) : students.map((s, idx) => (
            <tr key={idx}>
              <td key={s.idNumber}>{s.idNumber}</td>
              <td key={s.name}>{s.name}</td>
              <td className='expand' key={s.courseCode}>{`${s.course}`}</td>
              <td key={s.yearLevel}>{s.yearLevel}</td>
              <td key={s.gender}>{s.gender}</td>

              <td>
                <span>
                  <FontAwesomeIcon className='action-icon' icon={faPencil} onClick={() => editStudent(idx)} style={{ color: '#ffffff' }} />
                  <FontAwesomeIcon className='action-icon' onClick={() => deleteStudent(idx)} icon={faTrash} style={{ color: '#bd0000' }} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table