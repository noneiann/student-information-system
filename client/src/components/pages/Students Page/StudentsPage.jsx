import React, { useEffect, useState } from 'react';
import './StudentsPage.css';
import Table from './studentTable.jsx';
import { Button } from '../../Button.jsx';
import { CreateUser } from './CreateUser.jsx';
import { CSVLink } from "react-csv";
import Papa from "papaparse"

export default function StudentsPage({ students, courses, setStudents, setCourses }) {
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null)

  const headers = [
    { label: "idNumber", key: "idNumber" },
    { label: "name", key: "name" },
    { label: "course", key: "course" },
    { label: "enrollmentStatus", key: "enrollmentStatus" },
    { label: "yearLevel", key: "yearLevel" },
    { label: "gender", key: "gender" }
  ];

  const saveData = () => {
    localStorage.setItem('students', JSON.stringify(students));
  };

  const handleAddStudent = (newStudentData) => {
    studentToEdit === null ?
      setStudents([...students, newStudentData]) : setStudents(students.map((currStudent, idx) => {
        if (idx !== studentToEdit) return currStudent;

        return newStudentData;
      }))
  }

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setStudents([...students, ...results.data]);
      }
    });
  };

  const handleDeleteStudent = (targetIndex) => {
    setStudents(students.filter((_, idx) => idx !== targetIndex))
  }

  const handleEditStudent = (targetIndex) => {
    setStudentToEdit(targetIndex)
    setCreateUserOpen(true)
  }

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
          <Button children='Add a Student' buttonSize='btn--medium' buttonStyle='btn--outline' onClick={() => { setCreateUserOpen(true); saveData() }} />
        </div>
      </div>
      <Table students={currentStudents} deleteStudent={handleDeleteStudent} editStudent={handleEditStudent} />
      {createUserOpen && <CreateUser headers={headers} students={students} courses={courses} onSubmit={handleAddStudent} closeUser={() => { setCreateUserOpen(false); setStudentToEdit(null) }} defaultValue={studentToEdit !== null && students[studentToEdit]} />}

      <div className="pagination">
        <button className={`page-buttons ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
          <button key={i} className={`page-buttons ${currentPage === i + 1 ? 'active' : ''}`} disabled={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
        ))}
        <button className={`page-buttons ${currentPage === Math.ceil(students.length / studentsPerPage) ? 'disabled' : ''}`} onClick={handleNextPage} disabled={currentPage === Math.ceil(students.length / studentsPerPage)}>Next</button>
      </div>
    </div>
  );
}