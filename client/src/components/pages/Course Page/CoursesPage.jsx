import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import Table from './courseTable.jsx';
import { Button } from '../../Button.jsx';
import { CreateCourse } from './CreateCourse.jsx';
import { CSVLink } from "react-csv";
import Papa from "papaparse"


export default function CoursesPage({courses, setCourses, students, setStudents, triggerStudentUpdate }) {
  const [createCourseOpen, setcreateCourseOpen] = useState(false);


  const [courseToEdit, setCourseToEdit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [searchOption,setSearchOption] = useState('courseCode');
  const [sortOrder,setSortOrder] = useState({column: null, direction: null})

  const headers = [
    { label: "courseCode", key: "courseCode" },
    { label: "courseName", key: "courseName" },
    { label: "description", key: "description" },
  ];

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCourses([...courses, ...results.data]);
      }
    });
  };


  const handleAddCourse = (newCourseData) => {
    courseToEdit === null
      ? setCourses([...courses, newCourseData])
      : setCourses(courses.map((currCourse, idx) => {
          if (idx !== courseToEdit) return currCourse;
  

          const updatedStudents = students.map((student) => {
            if (
              student.courseCode === currCourse.courseCode &&
              student.courseName === currCourse.courseName
            ) {
              return {
                ...student,
                courseCode: newCourseData.courseCode,
                courseName: newCourseData.courseName,
              };
            }
            return student;
          });
  
          setStudents(updatedStudents);
          triggerStudentUpdate();
  
          return newCourseData;
        }));
  };

  const handleDeleteCourse = (targetIndex) => {
    const courseToDelete = currentCourses[targetIndex];
    const originalIndex = courses.findIndex(course => course === courseToDelete);
  
    if (originalIndex !== -1) {
      const deletedCourse = courses[originalIndex];
      const updatedCourses = courses.filter((_, idx) => idx !== originalIndex);
      setCourses(updatedCourses);
  
      const updatedStudents = students.map(student => {
        if (student.courseCode === deletedCourse.courseCode && student.courseName === deletedCourse.courseName) {
          return {
            ...student,
            courseCode: '',
            courseName: '',
            enrollmentStatus: 'Not Enrolled',
          };
        }
        return student;
      });
  
      setStudents(updatedStudents);
      triggerStudentUpdate();
    }
  };


  const handleEditCourse = (targetIndex) => {
    const courseToEdit = currentCourses[targetIndex];
    const originalIndex = courses.findIndex(course => course === courseToEdit);
  
    if (originalIndex !== -1) {
      setCourseToEdit(originalIndex);
      setcreateCourseOpen(true);
    }
  };
  const handleSort = (column) => {
    let direction;
    if (sortOrder.column === column && sortOrder.direction === 'asc') {
      direction = 'desc';
    } else {
      direction = 'asc';
    }
    setSortOrder({ column, direction });
  }

  const filteredCourses = courses.filter(course =>
    course[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCourses = filteredCourses.sort((a,b) => {
    if (sortOrder.column === null){
      return 0;
    } else if (a[sortOrder.column] < b[sortOrder.column]) {
      if(sortOrder.direction === 'asc'){
        return -1
      } else return 1;
    } else if (a[sortOrder.column] > b[sortOrder.column]){
      if(sortOrder.direction === 'asc'){
        return 1
      } else return -1;
    } else return 0;
  })

  const [coursesPerPage] = useState(7); 
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

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
    setCurrentPage(1); 
  }, [searchTerm]);
  

  return (
    <div className='courses'>
      <div className='courseHeader'>
        <h1>Student Information System</h1>
      </div>
      <div className='courseTop'>
        <div className="courseLabel"><p>Courses</p></div>

        <div className='btns'>
        <div className='search-container'>
          <input
          className='searchTerm'
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
              type="text"
              className='searchOption'
              id='course'
              name="course"
              onChange={(e) => {
                setSearchOption(e.target.value);
              }}
            >
              <option value="courseCode" defaultValue>Course Code</option>
              <option value="courseName">Course Name</option>
            </select>
          </div>
          <button for="file-upload" className="createBtn csvLink" onClick={() => {
            document.getElementById('file-upload').click();
            document.getElementById('file-upload').value = null;
          }}>
            Import CSV
            <input
              className='btn' type="file" id='file-upload' name="file" accept=".csv" onChange={changeHandler} style={{ display: 'none' }} />
          </button>

          <CSVLink filename={"Courses.csv"} className='createBtn csvLink' data={courses} headers={headers}>Export CSV</CSVLink>;
          <Button children='Add a Course' buttonSize='btn--medium' buttonStyle='btn--outline'  onClick={() => { setCourseToEdit(null); setcreateCourseOpen(true);}} />
        </div>
      </div>
      <Table courses={currentCourses} deleteCourse={handleDeleteCourse} editCourse={handleEditCourse} handleSort ={handleSort} sortOrder ={sortOrder} />
      {createCourseOpen && <CreateCourse headers={headers} onSubmit={handleAddCourse} defaultValue={courseToEdit !== null && courses[courseToEdit]} closeUser={() => { setcreateCourseOpen(false); }} courses ={courses} />}



      <div className="pagination">
        <button className={`page-buttons ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
          <button key={i} className={`page-buttons ${currentPage === i + 1 ? 'active' : ''}`} disabled={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
        ))}
        <button className={`page-buttons ${currentPage === Math.ceil(filteredCourses.length / coursesPerPage) ? 'disabled' : ''}`} onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}>Next</button>
      </div>
    </div>
  );
}
