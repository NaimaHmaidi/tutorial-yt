import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/imageHelper";
import geminiIcon from '../assets/gemini_icon.jpg';
import './AiwithImage.css';
import UserIcon from '../assets/user_icon.png';
import CompassIcon from '../assets/compass_icon.png';
import BulbIcon from '../assets/bulb_icon.png';
import MessageIcon from '../assets/message_icon.png';
import CodeIcon from '../assets/code_icon.png';
import SendIcon from '../assets/send_icon.png' ;

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyC1It4cDJmjelTu94Kt9c5kI5wX7DtqDqI');
    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [searched, setSearched] = useState(false); // Nouvel état pour suivre si la recherche a été effectuée

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    async function aiImageRun() {
        if (!isOnline) {
            alert("Vous êtes hors ligne. Veuillez vous connecter à Internet pour effectuer cette action.");
            return;
        }

        setLoading(true);
        setResponse('');
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
            const result = await model.generateContent([
                "what's in this photo?", imageInlineData
            ]);
            const response = await result.response;
            const text = response.text();
            setResponse(text);
        } catch (error) {
            console.error("Erreur lors de la requête à l'API Google Generative Language:", error);
            alert("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
            setSearched(true); // Marquer la recherche comme effectuée une fois terminée
        }
    }

    const handleClick = () => {
        if (!imageLoaded) {
            alert("Veuillez sélectionner une image avant de lancer la recherche.");
            return;
        }
        aiImageRun();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
            setImageLoaded(true);
        });
    }

    async function fileToGenerativePart(file) {
        const Base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await Base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div className="main">
            
        <div className="nav">
            
            <img src={UserIcon} alt="" style={{marginTop : '-40px' , marginLeft:'1400px'}}/>
        
        </div>
        <div className="main-container">
        {!searched && // Affiche l'accueil initial uniquement si la recherche n'a pas encore été effectuée
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How Can I help you today?</p>
            </div>
        }
          {!searched && // Affiche l'accueil initial uniquement si la recherche n'a pas encore été effectuée
        <div className="cards">
        <div className="card" >
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
}

        <div className="inputContainer">
  <input type='file' onChange={(e) => handleImageChange(e)} style={{ width: '350px', height: '50px'}} />  
  <span style={{ marginRight: '10px' }}></span> {/* Espacement */}
  <button className="searchButton" onClick={() => handleClick()}>
    <img src={SendIcon} alt="" style={{ width: '30px', height: '25px' }} />
  </button>
</div>


            {imageLoaded && <img src={image} className="imageContainer" alt="Uploaded" style={{ width: '250px', height: '110px'}}  />}
            {loading === true && (aiResponse === '') ?
                <div className="loadingContainer" >
                    <p>  <img src={geminiIcon} alt="" className="loadingIcon"  style={{ width: '30px', height: '30px', marginTop:'10px' }}/> Loading.... </p>
                </div>
                :
                <div>
                    {searched && // Affiche le résultat de l'image seulement si la recherche a été effectuée
                        <p> <img src={geminiIcon} alt="" style={{ width: '30px', height: '30px', marginTop:'20px' }} className="loadingIcon" />{aiResponse}</p>
                    }
                </div>
            }
        </div>
        </div>
    );
};

export default AiwithImage;



/*import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/imageHelper";
import geminiIcon from '../assets/gemini_icon.jpg';
import'./AiwithImage.css';
const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyC1It4cDJmjelTu94Kt9c5kI5wX7DtqDqI');
    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false); 

    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "what's in this photo?", imageInlineData
        ]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick = () => {
        if (!imageLoaded) {
            alert("Veuillez sélectionner une image avant de lancer la recherche.");
            return;
        }
        aiImageRun();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
            setImageLoaded(true); 
        });
    }

    async function fileToGenerativePart(file) {
        const Base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await Base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333333' }}>Google Gemini AI</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <input type='file' onChange={(e) => handleImageChange(e)} />
                <button style={{ marginLeft: '20px', padding: '10px 20px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' ,display: 'flex'}} onClick={() => handleClick()}>Search</button>
            </div>
            {imageLoaded && <img src={image} style={{ width: '50%', maxWidth: '500px', marginBottom: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} alt="Uploaded" />}
            {loading === true && (aiResponse === '') ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src={geminiIcon} alt="" style={{ width: '20px', marginRight: '10px' }} />
                    <p>Loading....</p>
                </div>
                :
                <div style={{ marginBottom: '20px' }}>
                    <p>{aiResponse}</p>
                </div>
            }
        </div>
    );
};

export default AiwithImage;*/