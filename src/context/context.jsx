import { createContext, useState } from "react";
import run from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        if (input.trim()) {
            setLoading(true);
            try {
                setResultData("");
                setShowResult(true);
                setRecentPrompt(input);

                if (!previousPrompt.includes(input)) {
                    setPreviousPrompt(prev => [...prev, input]);
                }

                const result = await run(input); 
                let cleanedResult = result.replace(/^##\s*/, "");

                let responseArray = cleanedResult.split("**");
                let newResponse = "";

                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newResponse += responseArray[i];
                    } else {
                        newResponse += "<b>" + responseArray[i] + "</b>";
                    }
                }

                let newResponse2 = newResponse.split("*").join("</br>");
                let newResponseArray = newResponse2.split(" ");

                for (let i = 0; i < newResponseArray.length; i++) {
                    const nextWord = newResponseArray[i];
                    delayPara(i, nextWord + " ");
                }

                setInput("");
            } catch (error) {
                console.error("Error sending prompt:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
