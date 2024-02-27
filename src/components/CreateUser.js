import React from 'react'
import '../styles/CreateUser.css';
import { Button } from './Button.js';
export const CreateUser = () => {
  return (
    <div className='createUser-container'>
        <div className='createUser'>
            <form>
                <div>
                    <label htmlFor="idNumber">ID Number: </label>
                    <input type="text" className='form-control' id='idNumber' name='idNumber'/>
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" className="form-control" id="name" name="name"/>
                </div>
                <div>
                    <label htmlFor="course">Course: </label>
                    <input type="text" className='form-control' id='course' name="course" />
                </div>
                <div>
                    <label htmlFor="yearLevel">Year Level: </label>
                    <select className='form-control' name="yearLevel" id="yearLevel">
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                </div>
                <div>
                <label htmlFor="gender">Gender: </label>
                <select className='form-control' name="gender" id="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>
                <Button children='Submit'/>
            </form>
        </div>
    </div>
  )
}
