import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Student=()=> {
    const [Students,setStudents] =useState([{
      idNumber: '2022-0224',
      Name: 'Rey Iann Tigley',
      yearLevel: '2nd Year',
      gender: 'Male',
      course: 'Bachelor of Science in Computer Science'
    },
    {
      idNumber: '2022-0427',
      Name: 'Elia Bado',
      yearLevel: '2nd Year',
      gender: 'Female',
      course: 'Bachelor of Science in Computer Science'
    }])
    const [idNumber,setIdNumber] = useState('');
    const [name,setName] = useState('')
    const [yearLevel,setYearLevel]= useState('');
    const [gender,setGender] = useState('');
    const [course,setCourse] = useState('');

    const handleAddCar =() =>{

    } 

    const handleRemoveCar = (index) => {

    }
    const updateId = (event) => {

    }
    const updateName = (event) => {

    }
    
    const updateYearLevel = (event) => {

    }

    const updateGender = (event) => {

    }

    const updateCourse = (event) => {

    }

        

  return (
    <tbody>
{Students.map((s,idx)=> <tr>
      <td key={s.idNumber}>{s.idNumber}</td>
      <td key={s.Name}>{s.Name}</td>
      <td className='expand' key={s.courseCode}>{s.courseCode}</td>
      <td key={s.yearLevel}>{s.yearLevel}</td>
      <td key={s.gender}>{s.gender}</td>
      
      <td>
        <span>
        <FontAwesomeIcon className='action-icon' icon={faPencil} style={{color: "#ffffff",}} />
        <FontAwesomeIcon className='action-icon' icon={faTrash} style={{color: "#bd0000",}} />
        </span>
      </td>
    </tr>)}
    </tbody>
      
  )
}
export default Student