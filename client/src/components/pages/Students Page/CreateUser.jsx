import React, { useState } from 'react';
import { Button } from '../../Button.jsx';
import '../../../styles/CreateUser.css'
import axios from 'axios';

export const CreateUser = ({ courses,students, closeUser, onSubmit, defaultValue }) => {
  // State variables for user input

  const goodKey = '0123456789- ';
  const [student, setStudent] = useState(defaultValue || {
    idNumber: '',
    name: '',
    yearLevel: '1st Year',
    gender: 'Male',
    courseCode: '', 
    courseName: '', 
    enrollmentStatus:'Not Enrolled',
  });
  const styles = {
    margin: 'auto',
    color: 'rgba(255,0,0,0.5)',
    padding: '0.6rem',
    'border-radius': '5px',
    background: 'rgba(255,100,100,0.2)'
  }

  const [errors, setErrors] = useState('');
  const validateForm = () => {

    if (student.idNumber && student.name) {
      setErrors('')
      return true
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(student)) {
        if (!value) {
          errorFields.push(key)
        }
      }
      setErrors(errorFields.join(', '))
      return false
    }

  }



  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const temp = document.getElementById('course')
    setStudent({ ...student, [temp.key]: temp.value });
    if (!validateForm()) return;
    // Pass data to parent component which is StudentsPage.js
    if (onSubmit) {
      onSubmit(student);
    }
    // Close the form after submission  
    closeUser()
  };

  const [idNumberYear, setIdNumberYear] = useState(
    defaultValue ? defaultValue.idNumber.split('-')[0] : ''
  );
  const [idNumberNum, setIdNumberNum] = useState(
    defaultValue ? defaultValue.idNumber.split('-')[1] : ''
  );
  
  const handleIdYearChange = (e) => {
    let filteredValue = e.target.value.replace(/[^0-9\- ]/gi, '');
    filteredValue = filteredValue.slice(0, 4);
    setIdNumberYear(filteredValue);
    setIdNumberNum(idNumberNum);
  
    const updatedId = filteredValue + '-' + idNumberNum;
    setStudent({
      ...student,
      idNumber: updatedId
    });
  }
  
  const handleIdNumChange = (e) => {
    let filteredValue = e.target.value.replace(/[^0-9\- ]/gi, '');
    filteredValue = filteredValue.slice(0, 4);
    setIdNumberNum(filteredValue);
    setIdNumberYear(idNumberYear);
  
    const updatedId = idNumberYear + '-' + filteredValue;
    setStudent({
      ...student,
      idNumber: updatedId
    });
  }
  

  const handleChange = (e) => {
    if (e.target.name === "course") {
      const selectedCourse = courses.find(c => `${c.courseCode}  ${c.courseName}` === e.target.value);
      if (selectedCourse) {
        setStudent({
          ...student,
          courseCode: selectedCourse.courseCode,
          courseName: selectedCourse.courseName,
        });
      } else {
        setStudent({
          ...student,
          courseCode: '',
          courseName: '',
        });
      }
    } else {
      setStudent({ ...student, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={`popUp-container`} onClick={(e) => {
      if (e.target.className === "popUp-container") closeUser();
    }}
    >
      <div className='popUp'>
        <form className='studentCreateForm'>
          <div className="header inputDiv">
            Fill in the Details
          </div>
          <div className='inputDiv'>
            <div style={{display: "inline"}}>
            <label htmlFor="idNumber">ID Number: </label>
              <input
                type="text"
                className='form-control'
                id='idNumberYear'
                name='idNumberYear'
                value={idNumberYear}
                onChange={handleIdYearChange}
              />
              <span style={{'font-size': '30px', color: 'white', 'margin-left': '5px','margin-right': '5px'}}>-</span>
              <input
                type="text"
                className='form-control'
                id='idNumberFinal'
                name='idNumber'
                value={idNumberNum}
                onChange={handleIdNumChange}
              />

            </div>
          </div>
          <div className='inputDiv'>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </div>
          <div className='inputDiv'>
            <label htmlFor="course">Course: </label>
            <select
              type="text"
              className='form-control'
              id='course'
              name="course"
              value={student.course}
              onChange={handleChange}
            >
              <option value="none" defaultValue>Select an Option</option>
              {courses.map((c, idx) => <option value={`${c.courseCode}  ${c.courseName}`}>{c.courseCode}</option>)}

            </select>
          </div>

          <div className='inputDiv'>
            <label htmlFor="course">Enrollment Status: </label>
            <select
              type="text"
              className='form-control'
              id='enrollmentStatus'
              name="enrollmentStatus"
              value={student.enrollmentStatus}
              onChange={handleChange}
            >
              
              <option value="Not Enrolled" defaultValue>Not Enrolled</option>
              {student.courseCode && <option value="Enrolled">Enrolled</option>}
            </select>
          </div>
          <div className='inputDiv'>
            <label htmlFor="yearLevel">Year Level: </label>
            <select className='form-control' name="yearLevel" id="yearLevel" value={student.yearLevel} onChange={handleChange}>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
          <div className='inputDiv'>
            <label htmlFor="gender">Gender: </label>
            <select className='form-control' name="gender" id="gender" value={student.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div style={{ display: 'flex' }}>
            <Button id='btn' children='Submit' buttonSize='btn--medium' buttonStyle='btn--outline' onClick={handleFormSubmit} />
            {errors && <div style={styles}>{`Fields are empty: ${errors}`}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};