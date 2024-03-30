import React from "react";
import './Main.css';
import UserIcon from '../../assets/user_icon.png';
import CompassIcon from '../../assets/compass_icon.png';
import BulbIcon from '../../assets/bulb_icon.png';
import MessageIcon from '../../assets/message_icon.png';
import CodeIcon from '../../assets/code_icon.png';
import GallaryIcon from '../../assets/gallary_icon.png';
import SendIcon from '../../assets/send_icon.png' ;
const Main = () => {

    return(
        
        <div className="main">
            
            <div className="nav">
                <p>Gemini</p>
                <img src={UserIcon} alt=""/>

            </div>
            <div className="main-container">
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How Can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Sugget beautiful places to see on an upcoming road trip</p>
                    <img src={CompassIcon } alt=""></img>
                </div>
                <div className="card">
                    <p>Briefly summarize this concept : urban planning</p>
                    <img
                     src={BulbIcon } alt=""></img>
                </div>
                <div className="card">
                    <p>Brainstrom team bonding activites for our work retreat</p>
                    <img src={ MessageIcon } alt=""></img>
                </div>
                <div className="card">
                    <p>Import the readability of the following code</p>
                    <img src={CodeIcon } alt=""></img>
                </div>
            </div>
            <div className="main-bottom">
            <div className="search-box">
                <input  type="text" placeholder="Enter a prompt here"/>
                <div>
                <img src={GallaryIcon } alt=""></img>
                <img src={SendIcon } alt=""></img>
                </div>

            </div>
            </div>
            </div>

        </div>
    )
}
export default Main;