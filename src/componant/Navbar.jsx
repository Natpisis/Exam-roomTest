import React from 'react';
import './Navbar.css';
import Search from './Search';

function Navbar() {
  return (
    <nav >
        <div >
            <div >
            <ul >
            <li>
                <a href="/Pageform">ส่งข้อสอบ</a>
            </li>
            <li>
                <a href="" >แก้ไขข้อสอบ</a>
            </li>
            <li>
                <a href="/PageSearch" >ดูข้อสอบ</a>
            </li>
            <li>
                <a href="#" >นำเข้าข้อมูล</a>
            </li>
            </ul>
         </div>
        </div>
    </nav>

  )
}
export default Navbar