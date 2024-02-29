import React, { useEffect, useState } from 'react';
import './StudentsPage.css';
import Table from './studentTable.js';
import { Button } from '../../Button.js';
import { CreateUser } from './CreateUser.js';
import { CSVLink } from "react-csv";
import Papa from "papaparse"

/*
 *
 * @Author Rey Iann V. Tigley
 * @description this is the StudentsPage, it lists down the students you see in the web app
 * it calls components studentTable.js and CreateUser.js
 * uses react-csv as the library for exporting csv's
 */

export default function StudentsPage({ }) {
  const [createUserOpen, setCreateUserOpen] = useState(false); // createUser Panel opener

//students array of objects, it accepts the student object prop from createUser.js and pushes them into this array to be used by studentTable.js
  const [students, setStudents] = useState(() => {
    // Retrieve saved students from localStorage on initial render
    const initialStudents = localStorage.getItem('students');
    try {
      return initialStudents ? JSON.parse(initialStudents) : [];
    } catch (error) {
      console.error('Error parsing students from localStorage:', error);
      // Set students to an empty array or display an error message to the user
      return []; // Example: set an empty array as fallback
    }
  });

  //this retrieves the courses from localStorage to be used by the courses key in the students panel
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

  //edit logic
  const [studentToEdit, setStudentToEdit] = useState(null)

  //headers to be used for react-csv
  const headers = [
    { label: "ID Number", key: "idNumber" },
    { label: "Name", key: "name" },
    { label: "Course", key: "course" },
    { label: "Year Level", key: "yearLevel" },
    { label: "Gender", key: "gender" }
  ];

  //saving to localStorage
  const saveData = () => {
    localStorage.setItem('students', JSON.stringify(students));
  };

  //add Student logic, since the edit logic and and add logic uses the same window, i checked first
  // if there are students to edit and then i do the add logic,
  // if there are, i replace the oldStudentdata with newStudentData
  const handleAddStudent = (newStudentData) => {
    studentToEdit === null ?
      setStudents([...students, newStudentData]) : setStudents(students.map((currStudent, idx) => {
        if (idx !== studentToEdit) return currStudent;

        return newStudentData;
      }))

  }

  //onChangeHandler for the import CSV Function
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCourses([...courses, ...results.data]);
      }
    });
  };
  // since the student objects are all inside the array students,
  // to delete a student, I filtered it from the array
  const handleDeleteStudent = (targetIndex) => {
    setStudents(students.filter((_, idx) => idx !== targetIndex))
  }

  //handles the editing logic when i click the edit element on the page
  const handleEditStudent = (targetIndex) => {
    setStudentToEdit(targetIndex)
    setCreateUserOpen(true)
  }

  const [file, setFile] = useState(null);
  const handleFileChange = (data) => {
    setFile(data); // Store the uploaded file data
  };

  //pagination

  const [studentsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  
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
    // Save students to localStorage on any changes to the students
    saveData();
  }, [students]);


  


  return (
    <div className='students'>

      {console.log(students)}
      <div className='studentHeader'>
        <h1>Student Information System</h1>
      </div>
      <div className='studentTop'>
        <div className="studentLabel"><p>Students</p></div>

        <div className='btns'>
        <button for="file-upload" className="createBtn csvLink" onClick={() => {
            document.getElementById('file-upload').click();
            document.getElementById('file-upload').value = null;
          }}>
            Import CSV
            <input
              className='btn' type="file" id='file-upload' name="file" accept=".csv" onChange={changeHandler} style={{ display: 'none' }} />
          </button>
          <CSVLink filename={"Students.csv"} className='createBtn csvLink' data={students} headers={headers}>Export CSV</CSVLink>;
          <Button children='Add a Student' buttonSize='btn--medium' buttonStyle='btn--outline' onClick={() => { setCreateUserOpen(true); saveData() }}
          />
        </div>
      </div>
      <Table students={currentStudents} deleteStudent={handleDeleteStudent} editStudent={handleEditStudent} />
      {createUserOpen && <CreateUser headers={headers} students={students} courses={courses} onSubmit={handleAddStudent} closeUser={() => { setCreateUserOpen(false); setStudentToEdit(null) }} defaultValue={studentToEdit !== null && students[studentToEdit]} />}
    
      <div className="pagination">
        <button className={`page-buttons ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
          <button key={i} className={`page-buttons ${currentPage === i + 1 ? 'active' : ''}`} disabled={currentPage === i + 1} onClick={() =>  handlePageChange()}>{i + 1}</button>
        ))}
        <button className={`page-buttons ${currentPage === Math.ceil(courses.length / studentsPerPage) ? 'disabled' : ''}`} onClick={handleNextPage} disabled={currentPage === Math.ceil(courses.length / studentsPerPage)}>Next</button>
      </div>


    </div>


  );
}