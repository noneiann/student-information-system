import React, { useState } from 'react';
import { Button } from '../../Button.jsx';
import '../../../styles/CreateUser.css'
import CoursesPage from './CoursesPage.jsx';

export const CreateCourse = ({courses, closeUser, onSubmit, defaultValue }) => {


  const [course, setCourse] = useState(defaultValue || {
    courseCode: '',
    courseName: '',
    description: '',
  })
  
  const [errors, setErrors] = useState('');
  const validateForm = () => {

    if (course.courseCode && course.courseName && course.description) {
      if(courses.some(c => c.courseCode === course.courseCode)) {
        setErrors('Course Already Exists')
        return false
      }
      setErrors('')
      return true
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(course)) {
        if (!value) {
          errorFields.push(key)
        }
      }
      setErrors('The following fields are empty: ' + errorFields.join(', '))
      return false
    }

  }


  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return; 


    if (onSubmit) {
      onSubmit(course);
    }


    closeUser()
  };


  const styles = {
    margin: 'auto',
    color: 'rgba(255,0,0,0.5)',
    padding: '0.6rem',
    'border-radius': '5px',
    background: 'rgba(255,100,100,0.2)'
  }

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div className={`popUp-container`} onClick={(e) => {
      if (e.target.className === "popUp-container") closeUser();
    }}
    >
      <div className='popUp'>
        <form className='courseCreateForm'>
          <div className="header inputDiv">
            Add a Course
          </div>
          <div className='inputDiv'>
            <label htmlFor="courseCode">Course Code: </label>
            <input
              type="text"
              className='form-control'
              id='courseCode'
              name='courseCode'
              value={course.courseCode}
              onChange={handleChange}
            />
          </div>
          <div className='inputDiv'>
            <label htmlFor="courseName">Course Name: </label>
            <input
              type="text"
              className="form-control"
              id="courseName"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
            />
          </div>
          <div className='inputDiv'>
            <label htmlFor="description">Description: </label>
            <textarea
              type="text"
              className='form-control'
              id='description'
              name="description"
              value={course.description}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Button id='btn' children='Submit' buttonSize='btn--medium' buttonStyle='btn--outline' onClick={handleFormSubmit} />
            {errors && <div style={styles}>{errors}</div>}
          </div>

        </form>
      </div>
    </div>
  );
};