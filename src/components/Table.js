import React from 'react'
import '../styles/Table.css'

import Student from './Student.js'

const Table = () => {
  const dataset = [

  ]
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
              <Student/>

        </table>
    </div>
  )
}

export default Table