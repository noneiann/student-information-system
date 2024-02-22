import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
 

  const [Student,SetStudent] = useState({
    idNumber: '',
    name: '',
    yearLevel: '',
    gender: '',
    courseCode:''
})
const [Students, setStudents] = useState([])


const handleInput = (event) => {
    event.preventDefault();
    const {name, value} = event.target
    console.log(name, value);
    
    SetStudent({ ...Student, [name]: value });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    setStudents(s => [...s,Student]);
    
    
    
}
const handleLog =(event) =>{
  event.preventDefault();

  console.log(Students)
}
  return (
    <div className="App">
      <h1>Students</h1>
      <form onSubmit={handleSubmit}>
      idNumber: <input type="text" className='form-control' id='idNumber' name='idNumber' value={Student.idNumber} onChange={handleInput} />
      Name: <input type="text" className="form-control" id="name" name="name" value={Student.name} onChange={handleInput} />
      yearLevel: <input type="text" className='form-control' id='yearLevel' name='yearLevel' value={Student.yearLevel} onChange={handleInput}/>
      gender: <input type="text" className='form-control' id='gender' name='gender' value={Student.gender} onChange={handleInput}/>
      CourseCode: <input type="text" className='form-control' id='courseCode' name='courseCode' value={Student.courseCode} onChange={handleInput}/>
      <button type="submit" className="btn btn-primary submit-btn">Submit</button>
      </form>
      <form onSubmit={handleLog}>
      <button type='submit'></button>
      </form>
      

      <br/>
      <br />
      <ul>
      {Students.map((s, index) =>
      <li key={s.idNumber}>
        {s.idNumber} {s.name} {s.yearLevel} {s.gender}
      </li>
      )}
      </ul>

      
    

    </div>
    
    
    


  );
}

export default App;
