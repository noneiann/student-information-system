import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import Table from './courseTable.js';
import { Button } from '../../Button.js';
import { CreateCourse } from './CreateCourse.js';
import { CSVLink } from "react-csv";
import Papa from "papaparse"
import { usePapaParse } from 'react-papaparse';
import './Courses.csv'
export default function CoursesPage(onCoursesUpdate) {
  const [createCourseOpen, setcreateCourseOpen] = useState(false);
  const [courses, setCourses] = useState(() => {
    // Retrieve saved courses from localStorage on initial render
    const initialCourses = localStorage.getItem('courses');
    try {
      return initialCourses ? JSON.parse(initialCourses) : [];
    } catch (error) {
      console.error('Error parsing courses from localStorage:', error);
      // Set courses to an empty array or display an error message to the user
      return []; // Example: set an empty array as fallback
    }
  });
  const [courseToEdit, setCourseToEdit] = useState(null)
  const headers = [
    { label: "Course Code", key: "courseCode" },
    { label: "Course Name", key: "courseName" },
    { label: "Description", key: "description" },

  ];
  const { readRemoteFile } = usePapaParse();
  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCourses([...courses, ...results.data]);
      }
    });
  };
  const saveData = () => {
    localStorage.setItem('courses', JSON.stringify(courses));
  };
  const handleAddCourse = (newCourseData) => {
    courseToEdit === null ?
      setCourses([...courses, newCourseData]) : setCourses(courses.map((currCourse, idx) => {
        if (idx !== courseToEdit) return currCourse;

        return newCourseData;
      }))

  }
  const handleDeleteCourse = (targetIndex) => {
    setCourses(courses.filter((_, idx) => idx !== targetIndex))
  }
  const handleEditCourse = (targetIndex) => {
    setCourseToEdit(targetIndex)
    setcreateCourseOpen(true)
  }

  const handleReadRemoteFile = () => {
    const url = 'your_file_url_here'
    readRemoteFile(url, {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
      },
    });
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (data) => {
    setFile(data); // Store the uploaded file data
  };
  useEffect(() => {
    // Save courses to localStorage on any changes
    saveData();
  }, [courses]);
  return (
    <div className='courses'>
      {console.log(courses)}
      <div className='courseHeader'>
        <h1>Student Information System</h1>
        <button style={{ color: 'white', background: 'white' }} onClick={handleReadRemoteFile}>CLICK ME</button>
      </div>
      <div className='courseTop'>
        <div className="courseLabel"><p>Courses</p></div>

        <div className='btns'>
          <button for="file-upload" class="createBtn csvLink" onClick={()=> {document.getElementById('file-upload').click(  ); document.getElementById('file-upload').value = null;}}>
            Import CSV
            <input
            className='btn' type="file" id='file-upload' name="file" accept=".csv "  onChange={changeHandler} style={{ display: 'none' }} />
          </button>
          
          <CSVLink filename={"Courses.csv"} className='createBtn csvLink' data={courses} headers={headers}>Export CSV</CSVLink>;
          <Button children='Add a Course' buttonSize='btn--medium' buttonStyle='btn--outline' onClick={() => { setcreateCourseOpen(true); saveData() }}
          />
        </div>
      </div>
      <Table courses={courses} deleteCourse={handleDeleteCourse} editCourse={handleEditCourse} />
      {createCourseOpen && <CreateCourse headers={headers} onSubmit={handleAddCourse} closeUser={() => { setcreateCourseOpen(false); setCourseToEdit(null) }} defaultValue={courseToEdit !== null && courses[courseToEdit]} />}
    </div>


  );
}