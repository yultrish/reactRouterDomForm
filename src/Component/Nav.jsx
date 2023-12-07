import React from 'react'
import NavStyles from "./Nav.module.css"
import { Link } from 'react-router-dom'
// import Front from "/b2.jpg"


export default function Nav() {
  return (
    <>
    <nav className={NavStyles.navbar}>
        <div className={NavStyles.logo}>YuLtRiSh</div>
        {/* <div className={NavStyles.links}> */}
            <ul className={NavStyles.menu}>
                <li>Home</li>
                {/* <li>About</li> */}
                {/* <li></li> */}
                {/* <li>Contact</li> */}
            <Link to="/create-post"> 
                <li>
                    <button className={NavStyles.listBtn}>New Post</button>

                </li>
            </Link>   
              

            </ul>
        {/* </div> */}
    </nav>

    <div className="flex">
    {/* <img src={Front} alt="" />
    <div className="text">
        <h3>Yultrish Codes</h3>
        <h3>Lets Code together</h3><br /><h3>I am here to code</h3> */}
    {/* </div> */}

    </div>

   

    </>
  )
}
