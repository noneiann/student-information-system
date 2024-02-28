import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.js';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsPage from './components/pages/Students Page/StudentsPage.js';
import CoursesPage from './components/pages/Course Page/CoursesPage.js';


function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);


  return (
    <div className="App">
      <>
        <Router>
          <Sidebar setIsMenuActive={setIsMenuActive} />
          <div className={isMenuActive ? 'active-content' : 'non-active-content'}> {/* Adjust marginLeft according to your navbar width */}


            <Routes>
              <Route path="/" exact element={< StudentsPage />}></Route>
              <Route path="/courses" element={< CoursesPage />}></Route>

            </Routes>
          </div>
        </Router>
      </>
    </div>
  );
}

export default App; 
