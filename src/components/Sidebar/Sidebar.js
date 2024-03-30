import React, { useState } from "react";
import './Sidebar.css';
import MenuIcon from "../assets/menu_icon.jpg";
import PlusIcon from "../assets/plus_icon.png";

 const Sidebar = ()=> {
    const [extended , setExtended] = useState (false)
    return (
    <div className="sidebar">
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={MenuIcon} alt=""/>
            <div className="new-chat">
                <img src={PlusIcon} alt=""/>
                {extended?<p>New chat</p>:null}
            </div>

        </div>

    </div>)
 }
 export default Sidebar;