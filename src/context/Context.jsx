import { createContext, useState, useSyncExternalStore } from "react";
import run from '../config/gemini';

export const MyContext = createContext();

const MyContextProvider = (props) => {

    const [extented, setExtend] = useState(false);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) =>{
        setTimeout(() => {
            setResultData(prev => prev+nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setShowResult(false)
        setLoading(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        ////clicked on recent entry
        let response = "";
        if(prompt !== undefined)
        {
            setRecentPrompt(prompt)
            response = await run(prompt)
        }
        else
        {
            setRecentPrompt(input)
            response = await run(input)
            setPrevPrompts((prevArr => [...prevArr, input]));
        }
        
        ////doubStarRemovedWithBoldHeadLinesRespose
        const responseArray = response.split("**");
        let newRespose = "";
        for(let i=0; i<responseArray.length; i++)
        {
                if(i===0 || i%2 !== 1)
                {
                    newRespose += responseArray[i];
                }
                else
                {
                    newRespose += "<b>"+responseArray[i]+"</b>";
                }
        }
        //removeStarAndAddNewLineResponse
        const newResponse2 = newRespose.split("*").join("<br>");
        //typing effect
        const newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i]+" ";
            delayPara(i, nextWord);
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
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
        newChat
    };

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyContextProvider;