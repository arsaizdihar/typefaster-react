import { useEffect, useRef, useState } from "react";
import { fetchWithToken } from "../../util";

const Race = (props) => {
    const [question, setQuestion] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [isWrong, setIsWrong] = useState(false);
    const [type, setType] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [focus, setFocus] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        fetchWithToken("api/random-words", "GET", null).then((data) => {
            if (typeof data === "string") setQuestion(data);
            else props.history.push("/login");
        });
        inputRef.current.focus();
        setFocus(true);
        return () => {
            setDisabled(false);
            setStartTime(null);
            setIsWrong(false);
            setWordCount(0);
            setType("");
        };
    }, [props.history]);

    const handleRetryButton = async () => {
        await fetchWithToken("api/random-words", "GET", null).then((data) => {
            if (typeof data === "string") setQuestion(data);
            else props.history.push("/login");
        });
        setDisabled(false);
        setStartTime(null);
        setIsWrong(false);
        setWordCount(0);
        setType("");
        inputRef.current.focus();
        setFocus(true);
    };

    const splitted_question = question.split(" ");
    const handleCorrection = (e) => {
        const value = e.currentTarget.value;
        const prefValue = type;
        const currentWord = splitted_question[wordCount];
        if (startTime === null) setStartTime(new Date().getTime());
        if (Math.abs(prefValue.length - value.length) !== 1) return;
        setType(value);
        if (value === "") {
            setIsWrong(false);
            return;
        }
        if (value.trim() === currentWord && value !== currentWord) {
            setWordCount(wordCount + 1);
            setType("");
        } else if (currentWord.startsWith(value)) {
            if (
                currentWord === value &&
                wordCount + 1 === splitted_question.length
            ) {
                setDisabled(true);
                setWordCount(wordCount + 1);
                setType("");
            }
            setIsWrong(false);
        } else {
            setIsWrong(true);
        }
    };
    let charCount = 0;
    let wrongChars = 0;
    for (let i = 0; i < wordCount; i++) {
        charCount += splitted_question[i].length + 1;
    }
    if (!isWrong) {
        charCount += type.length;
    } else {
        for (let i = 1; i < type.length; i++) {
            if (splitted_question[wordCount].startsWith(type.substring(0, i)))
                charCount++;
            else {
                wrongChars += type.length - i;
                break;
            }
        }
        wrongChars++;
    }
    const correctChars = question.substring(0, charCount);
    const defChars = question.substring(charCount + wrongChars);
    let wpm = (charCount / (new Date().getTime() - startTime)) * 1000 * 12;
    if (wpm > 300) wpm = 0;
    return (
        <div className="flex flex-wrap w-full md:w-3/4 lg:md-1/2 pt-8 mx-auto px-5">
            <h1 className="w-full text-5xl sm:text-7xl text-center pb-5 font-mono font-extrabold">
                {wpm.toFixed(2)}
            </h1>
            <p
                className={
                    disabled
                        ? "text-lg sm:text-xl w-full py-2 px-3 rounded-lg mb-4 text-gray-900 bg-green-300 font-mono font-extralight cursor-pointer"
                        : "text-lg sm:text-xl w-full py-2 px-3 rounded-lg mb-4 text-gray-900 bg-blue-100 font-mono font-extralight cursor-pointer"
                }
                onClick={() => {
                    inputRef.current.focus();
                    if (!focus) setFocus(true);
                }}
            >
                <span className="font-extrabold text-blue-700">
                    {correctChars}
                </span>
                <span className="font-extrabold text-red-700 bg-red-100">
                    {question.substring(charCount, charCount + wrongChars)}
                </span>
                {focus && <span className="-mx-1.5 animate-pulse-fast">|</span>}
                {defChars}
            </p>
            <input
                type="text"
                name="typing"
                value={type}
                onChange={handleCorrection}
                onBlur={function () {
                    setFocus(false);
                }}
                onFocus={() => setFocus(true)}
                className={
                    isWrong
                        ? "text-m font-semibold appearance-none rounded w-full py-2 px-3 text-red-700 bg-red-300 leading-tight focus:border-gray-800 h-10 sm:w-0 sm:h-0 sm:p-0"
                        : "text-m font-semibold appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:border-gray-800 h-10 sm:w-0 sm:h-0 sm:p-0"
                }
                spellCheck="false"
                placeholder="Start typing"
                autoCorrect="off"
                autoComplete="off"
                disabled={disabled}
                ref={inputRef}
            ></input>
            <button
                className="my-6 border-2 border-gray-100 focus:outline-none bg-green-600 text-white font-bold tracking-wider block w-48 mx-auto p-2 rounded-lg focus:border-gray-700 hover:bg-green-700"
                onClick={handleRetryButton}
            >
                Retry
            </button>
        </div>
    );
};

export default Race;
