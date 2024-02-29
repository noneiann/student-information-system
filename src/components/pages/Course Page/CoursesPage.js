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
      return [];
    }
  });

  const [courseToEdit, setCourseToEdit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  const headers = [
    { label: "Course Code", key: "courseCode" },
    { label: "Course Name", key: "courseName" },
    { label: "Description", key: "description" },
  ];

  const { readRemoteFile } = usePapaParse();

  const changeHandler = (event) => {
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
  };

  const handleDeleteCourse = (targetIndex) => {
    setCourses(courses.filter((_, idx) => idx !== targetIndex))
  };

  const handleEditCourse = (targetIndex) => {
    setCourseToEdit(targetIndex)
    setcreateCourseOpen(true)
  };

  const handleReadRemoteFile = () => {
    const url = 'your_file_url_here';
    readRemoteFile(url, {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
      },
    });
  };

  //pagination
  const [coursesPerPage] = useState(10); // Adjust the number of courses per page as needed
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    saveData();
  }, [courses]);

  return (
    <div className='courses'>
      <div className='courseHeader'>
        <h1>Student Information System</h1>
      </div>
      <div className='courseTop'>
        <div className="courseLabel"><p>Courses</p></div>

        <div className='btns'>
          <button for="file-upload" className="createBtn csvLink" onClick={() => {
            document.getElementById('file-upload').click();
            document.getElementById('file-upload').value = null;
          }}>
            Import CSV
            <input
              className='btn' type="file" id='file-upload' name="file" accept=".csv" onChange={changeHandler} style={{ display: 'none' }} />
          </button>

          <CSVLink filename={"Courses.csv"} className='createBtn csvLink' data={courses} headers={headers}>Export CSV</CSVLink>;
          <Button children='Add a Course' buttonSize='btn--medium' buttonStyle='btn--outline'  onClick={() => { setcreateCourseOpen(true); saveData() }} />
        </div>
      </div>
      <Table courses={currentCourses} deleteCourse={handleDeleteCourse} editCourse={handleEditCourse} />
      {createCourseOpen && <CreateCourse headers={headers} onSubmit={handleAddCourse} defaultValue={courseToEdit !== null && courses[courseToEdit]} closeUser={() => { setcreateCourseOpen(false); }} />}
      {/* Pagination */}
      <div className="pagination">
        <button className={`page-buttons ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
          <button key={i} className={`page-buttons ${currentPage === i + 1 ? 'active' : ''}`} disabled={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
        ))}
        <button className={`page-buttons ${currentPage === Math.ceil(courses.length / coursesPerPage) ? 'disabled' : ''}`} onClick={handleNextPage} disabled={currentPage === Math.ceil(courses.length / coursesPerPage)}>Next</button>
      </div>
    </div>
  );
}
