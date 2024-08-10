import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from '../../assets/assets';
import { MyContext } from "../../context/Context";


export const Sidebar = () => {

    const screenWidth = screen.availWidth;

    const {extented, setExtend, onSent, prevPrompts, newChat} = useContext(MyContext);

    const loadPrompt = async(prompt) =>{
        await onSent(prompt)
    }
    
    return (
    
        <div className={screen.availWidth<501 ? extented?"extSidebar":"unextSidebar" : "sidebar"}>
            <div className="top">
                <img className="menu" onClick={() => setExtend(prev => !prev)} src={assets.menuIcon} alt="menuIcon" />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.addIcon} alt="addIcon" />
                    {extented ? <p>New Chat</p> : null}
                </div>
                {extented ? <div className="recent ">
                    <p className="recent-title">Recent</p>
                    <div className="recent-entries">
                    {prevPrompts.map((item, index) => {
                        return (
                            <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                <img src={assets.messageIcon} alt="messageIcon" />
                                <p>{item.slice(0, 18)}....</p>
                            </div>
                        );
                    })}
                    </div>
                </div> : null }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.questionIcon} alt="questionIcon" />
                    {extented ? <p>Help</p> : null }
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.historyIcon} alt="historyIcon" />
                    {extented ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.settingIcon} alt="settingIcon" />                   
                    {extented ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}
