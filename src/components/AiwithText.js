import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './AiwithText.css';
import UserIcon from '../assets/user_icon.png';
import CompassIcon from '../assets/compass_icon.png';
import BulbIcon from '../assets/bulb_icon.png';
import MessageIcon from '../assets/message_icon.png';
import CodeIcon from '../assets/code_icon.png';
import SendIcon from '../assets/send_icon.png';
import geminiIcon from '../assets/gemini_icon.jpg';

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyC1It4cDJmjelTu94Kt9c5kI5wX7DtqDqI');
    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false); // State to track if search has been performed
    
    useEffect(() => {
        function handleOffline() {
            alert("Vous avez perdu la connexion.");
        }

        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    async function aiRun() {
        setLoading(true);
        setResponse('');
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `${search}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setResponse(text);
        } catch (error) {
            alert("Une erreur s'est produite lors de la génération du contenu. Veuillez réessayer plus tard.");
        }
        setLoading(false);
        setSearched(true); // Set searched to true after search is performed
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        if (search.trim() !== '') {
            aiRun();
        } else {
            alert("Veuillez entrer du texte avant de rechercher.");
        }
    }

    return (
        <div className="mai">
            <div className="nav">
                
                <img src={UserIcon} alt="" style={{marginTop : '-40px' , marginLeft:'1400px'}}/>
            </div>
            <div className="mai-container">
                {!searched && (
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>How Can I help you today?</p>
                    </div>
                )}
                {!searched && (
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={CompassIcon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={BulbIcon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={MessageIcon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Assess the readability of the following code</p>
                        <img src={CodeIcon} alt=""/>
                    </div>
                </div>
                )}
                <div className="mai-bottom">
                    <div className="search-boxs">
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <input 
                                type="text" 
                                placeholder="Enter a prompt here" 
                                value={search} 
                                onChange={(e) => handleChangeSearch(e)} 
                                style={{backgroundImage: `url(${loading ? geminiIcon : ''})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }}  
                            />
                            <span style={{ position: 'absolute', right: '30px', top: '10px', color: '#555' }}>{search.length}</span>
                            
                            {loading && (
                                <div style={{ position: 'absolute', right: '100px', top: '50%', transform: 'translateY(-50%)', color: '#555' }}>Loading...</div>
                            )}
                            
                            <img src={SendIcon} alt="" onClick={() => handleClick()} style={{ marginLeft: '580px' }}/>
                        </div>
                    </div>
                </div>
            </div>
            {!loading && aiResponse !== '' && (
                <div style={{ margin: '30px 60px' }}>
                     <p>  <img src={UserIcon} alt="" style={{ width: '30px', height: '30px', marginTop:'-50px' }}/> {search}</p> {/* Ajout de cette ligne pour afficher le texte saisi */}
                    <p><img src={geminiIcon} alt="" style={{ width: '30px', height: '30px', marginTop:'20px' }} className="loadingIcon" />{aiResponse}</p>
                    
                </div>

                
            )}
        </div>
    );
};

export default AiwithText;
