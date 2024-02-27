import React from 'react'
import './StudentsPage.css'
import Table from '../Table.js'
import { Button } from '../Button.js'
import { CreateUser } from '../CreateUser.js'

export default function StudentsPage() {
  return (
    <div className='students'>
      <div className='studentHeader'>
      <h1>Student Information System</h1>
      </div>
      <div className='studentTop'>
        <div className="studentLabel"><p>Students</p></div>
      
      <div className='btns'>
      <Button className='createBtn' children='Add Student' buttonSize='btn--medium' buttonStyle='btn--outline'/>
      <Button className='createBtn' children='Export CSV' buttonSize='btn--medium' buttonStyle='btn--outline'/>
      </div>
     
      </div>
      <Table/>
      {/* <CreateUser/> */}
      
    </div>
  )
}
