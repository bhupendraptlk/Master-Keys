import { useEffect, useState } from "react";
import "./App.css";
import { Helpers } from "./Helpers";
import Refresh from "./assets/images/refresh.png";
import Timer from "./Timer";
import { useCountdown } from "./useCountdown";

function App() {
  const TARGET_IN_MS = 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const countdownTarget = NOW_IN_MS + TARGET_IN_MS;
  const [start,setStart] = useState(false);
  const [minutes,seconds,disabled] = useCountdown(new Date(countdownTarget),start)
  const [status, setStatus] = useState(true);
  const [words, setWords] = useState();
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wordLength, setWordLength] = useState(1);
  const [wordCount, setWordCount] = useState(6);
  const[reset,setReset] = useState(false);
  const handleWords = () => {
    const words = Helpers(wordLength, wordCount);
    const stringOfWords = words.join(" ");
    setWords(stringOfWords);
    setStart(false);
    setReset(!reset);
  };
  useEffect(() => {
    handleWords();
  }, []);
  const handleChange = (e) => {
    const typed = e.target.value;
    if (words.localeCompare(typed) == 0) {
      handleWords();
      document.getElementById("user-input").value = "";
    }
    if (words.startsWith(typed)) {
      setStatus(true);
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
      setStatus(false);
    }
    console.log("status : " + status);
    let acc = (correct / (correct + wrong)) * 100;
    setAccuracy(Math.ceil(acc));
  };
  return (
    <>
      <div className="container">
        <h1 className="title-text text-white text-center">Master Keys</h1>
        <div className="app-outer w-100 d-flex align-items-center justify-content-center">
          <div className="app-wrapper">
            <div className=" text-white mb-5">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <Timer value={minutes} type="minutes" isDanger={minutes <= 2} />
                <p className="mx-3 my-0">:</p>
                <Timer value={seconds} type="seconds" isDanger={minutes <=2 && seconds <= 60} />
                <button className="btn btn-primary start-btn" onClick={()=>setStart(true)}>Start</button>
              </div>
              <div className="heading-wrapper d-flex align-items-center justify-content-between">
                <h4 className="text-center m-0">Accuracy : {(minutes==0 && seconds==0) ? (accuracy+"%") : "Awaited"}</h4>
                <div className="d-flex align-items-center mx-4 h4 my-0">
                  <label htmlFor="wordLength">Number of Words :</label>
                  <input
                    type="number"
                    className="ms-2"
                    onChange={(e) => setWordCount(e.target.value)}
                    name="wordLength"
                    defaultValue="6"
                    min="1"
                    max="9"
                  />
                </div>
                <div className="d-flex align-items-cente h4 my-0">
                  <label htmlFor="wordLength">Length of Words :</label>
                  <input
                    type="number"
                    className="ms-2"
                    onChange={(e) => setWordLength(e.target.value)}
                    name="wordLength"
                    defaultValue="1"
                    min="1"
                    max="9"
                  />
                </div>
                <a
                  onClick={handleWords}
                  className="h4 cursor-pointer ms-4 my-0 text-none"
                >
                  Refresh <img src={Refresh} />
                </a>
              </div>
            </div>
            <div className="ref-text text-center py-3 px-2 my-3 text-white font-28">
              {words}
            </div>
            <input
              id="user-input"
              type="text"
              onChange={handleChange}
              className={
                status
                  ? "disabled input-correct input-text font-28 px-2 py-3 w-100 text-center text-white"
                  : "disabled input-wrong input-text font-28 text-center text-white w-100 px-2 py-3"
              }
              disabled={disabled}
              placeholder="Type here.."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
