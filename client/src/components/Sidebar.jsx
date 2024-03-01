import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
function Sidebar({ setIsMenuActive }) {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
        setIsMenuActive(!click)
    }


    return (
        <>
            <nav className='sidebar'>
                <div className={click ? 'nav-menu active' : 'nav-menu'}>
                    <div className='menu-icon' >
                        <i className='fas fa-bars' id='btn' onClick={handleClick} />
                    </div>
                    <div className="top">
                        <div className='sidebar-logo'>
                            <Link to='/' className='logo' >
                                SIS
                            </Link>
                        </div>

                    </div>



                    <ul>


                        <li>
                            <Link to='/' className='nav-links'>
                                <FontAwesomeIcon icon={faUser} className='nav-icons' />
                                <span className='nav-item'>Students</span>
                            </Link>
                            <span className='tooltip'>Students</span>
                        </li>
                        <li>

                            <Link to='/courses' className='nav-links'>
                                <FontAwesomeIcon icon={faFolder} className='nav-icons' />
                                <span className='nav-item'>Courses</span>
                            </Link>
                            <span className='tooltip'>Courses</span>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Sidebar