import React, { useEffect, useState } from 'react';
import './StudentsPage.css';
import Table from './studentTable.jsx';
import { Button } from '../../Button.jsx';
import { CreateUser } from './CreateUser.jsx';
import { CSVLink } from "react-csv";
import Papa from "papaparse"

export default function StudentsPage({ students, courses, setStudents, setCourses }) {
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('idNumber');
  const [sortOrder, setSortOrder] = useState({ column: null, direction: null });

  const filteredStudents = students.filter(student =>
    student[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortOrder.column === null) {
      return 0;
    } else if (a[sortOrder.column] < b[sortOrder.column]) {
      return sortOrder.direction === 'asc' ? -1 : 1;
    } else if (a[sortOrder.column] > b[sortOrder.column]) {
      return sortOrder.direction === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });


  
  const headers = [
    { label: "idNumber", key: "idNumber" },
    { label: "name", key: "name" },
    { label: "yearLevel", key: "yearLevel" },
    { label: "gender", key: "gender" },
    { label: "courseCode", key: "courseCode" },
    { label: "courseName", key: "courseName" },
    { label: "enrollmentStatus", key: "enrollmentStatus" }
  ];


  const handleAddStudent = (newStudentData) => {
    if (studentToEdit === null) {
      setStudents([...students, newStudentData]);
    } else {
      const updatedStudents = [...students];
      updatedStudents[studentToEdit] = newStudentData;
      setStudents(updatedStudents);
    }
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

  const handleSort = (column) => {
    let direction;
    if (sortOrder.column === column && sortOrder.direction === 'asc') {
    direction = 'desc';
  } else {
    direction = 'asc';
  }
  setSortOrder({ column, direction });
  };

  const handleDeleteStudent = (targetIndex) => {
    const studentToDelete = currentStudents[targetIndex];
    const originalIndex = students.findIndex(student => student === studentToDelete);

    if (originalIndex !== -1) {
      setStudents(sortedStudents.filter((_, idx) => idx !== originalIndex))
    }
    
  }

const handleEditStudent = (targetIndex) => {
  const studentToEdit = currentStudents[targetIndex];
  const originalIndex = students.findIndex(student => student === studentToEdit);

  if (originalIndex !== -1) {
    setStudentToEdit(originalIndex);
    setCreateUserOpen(true);
  }
};

  const [studentsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

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
    <div className='students'>
      {console.log(students)}
      <div className='studentHeader'>
        <h1>Student Information System</h1>
      </div>
      <div className='studentTop'>
        <div className="studentLabel"><p>Students</p></div>
        
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
              <option value="idNumber" defaultValue>ID Number</option>
              <option value="name">Name</option>
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
          <CSVLink filename={"Students.csv"} className='createBtn csvLink' data={students} headers={headers}>Export CSV</CSVLink>;
          <Button children='Add a Student' buttonSize='btn--medium' buttonStyle='btn--outline' onClick={() => { setCreateUserOpen(true)}} />
        </div>
      </div>
      <Table students={currentStudents} deleteStudent={handleDeleteStudent} editStudent={handleEditStudent} handleSort={handleSort} sortOrder={sortOrder} />
      {createUserOpen && <CreateUser headers={headers} students={students} courses={courses} onSubmit={handleAddStudent} closeUser={() => { setCreateUserOpen(false); setStudentToEdit(null) }} defaultValue={studentToEdit !== null && students[studentToEdit]} />}
      <div className="pagination">
  <button className={`page-buttons ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
  {Array.from({ length: Math.ceil(sortedStudents.length / studentsPerPage) }, (_, i) => (
    <button key={i} className={`page-buttons ${currentPage === i + 1 ? 'active' : ''}`} disabled={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
  ))}
  <button className={`page-buttons ${currentPage === Math.ceil(sortedStudents.length / studentsPerPage) ? 'disabled' : ''}`} onClick={handleNextPage} disabled={currentPage === Math.ceil(sortedStudents.length / studentsPerPage)}>Next</button>
</div>
    </div>
  );
}
