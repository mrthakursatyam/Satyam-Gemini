import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { MyContext } from "../../context/Context";

export const Main = () => {

  const screenWidth = screen.availWidth;

  const {
    extented, 
    setExtend,
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(MyContext);

  return (
    
    <div className={screen.availWidth<501 ? extented ?"extMain":"unextMain" : "main"}>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.userIcon} alt="userIcon" />
      </div>

      <div className={screen.availWidth<501 ? extented ?"main-container":"unextMain-container" : "main-container"}>
        
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can i help you today ?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compassIcon} alt="compassIcon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulbIcon} alt="bulbIcon" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activities for our work retreat</p>
                <img src={assets.messageIcon} alt="messageIcon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.codeIcon} alt="codeIcon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.userIcon} alt="userIcon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemIcon} alt="geminiIcon" />

              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )} 
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="text" placeholder="Enter a prompt here"/>
            <div className="controls-btn">
              <img src={assets.galleryIcon} alt="galleryIcon" />
              <img src={assets.micIcon} alt="micIcon" />
              {input ? <img onClick={()=>{onSent()}} src={assets.sendIcon} alt="sendIcon" />
               : null
              }
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about peoples, so
            double-check its response.
          </p>
        </div>
      </div>
    </div>
  );
};
