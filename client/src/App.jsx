import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsPage from './components/pages/Students Page/StudentsPage.jsx';
import CoursesPage from './components/pages/Course Page/CoursesPage.jsx';
import axios from 'axios';

function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [shouldUpdateStudents, setShouldUpdateStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const readCSVFile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api").then(
        response => {
          setStudents(response.data.students)
          setCourses(response.data.courses)
          setIsLoading(false);
        }
      )
    } catch (error) {
      console.error('Error reading CSV file:', error);
      setIsLoading(false);
      return [];
    }
  };

  const saveCSVFileStudents = async () => {
    try {
      const response = await axios.post("/save-csv-students", { students }).then(
        response => {
          console.log(response)
        }
      )
    } catch (error) {
      console.error('Error saving CSV file:', error)
    }
  }

  const saveCSVFileCourses = async () => {
    try {
      const response = await axios.post("/save-csv-courses", { courses }).then(
        response => {
          console.log(response)
        }
      )
    } catch (error) {
      console.error('Error saving CSV file:', error)
    }
  }
  const triggerStudentUpdate = () => {
    setShouldUpdateStudents(!shouldUpdateStudents);
  };

  useEffect(() => {
    readCSVFile();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      saveCSVFileStudents();
    }
  }, [students]);


  useEffect(() => {
    if (courses.length > 0) {
      saveCSVFileCourses();
    }
  }, [courses]);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {console.log(students)}
          <Router>
            <Sidebar setIsMenuActive={setIsMenuActive} />
            <div className={isMenuActive ? 'active-content' : 'non-active-content'}>
              <Routes>
                <Route path="/" exact element={<StudentsPage courses={courses} setCourses={setCourses} students={students} setStudents={setStudents} triggerStudentUpdate={triggerStudentUpdate} />} />
                <Route path="/courses" element={<CoursesPage courses={courses} setCourses={setCourses} students={students} setStudents={setStudents} triggerStudentUpdate={triggerStudentUpdate} />} />
              </Routes>
            </div>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;