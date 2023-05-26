import React, { useState, useEffect , useRef} from 'react';
 
import styles from "../Styles/Typescript.module.css"

const TypingMaster = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(30);
  const [accuracy, setAccuracy] = useState(0);

        const inputRef= useRef(null);

  const keyboardKeys = 'asdfjkl;';

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
        inputRef.current.focus();
      }, 1000);
      return () => {
        clearInterval(countdown);
      };
      
    } else {
      setEndTime(Date.now());
      calculateAccuracy();
    }
  }, [timer]);

  const handleKeyDown = (event) => {
    if (event.key === keyboardKeys[currentIndex]) {
      if (currentIndex === 0) {
        setStartTime(Date.now());
      }
      if (currentIndex === keyboardKeys.length - 1) {
        setEndTime(Date.now());
      }
      setScore(score + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setText('');
    setCurrentIndex(0);
    setScore(0);
    setStartTime(null);
    setEndTime(null);
    setTimer(30);
    setAccuracy(0);
  };

  const calculateAccuracy = () => {
    const typedKeys = text.slice(0, keyboardKeys.length);
    console.log(typedKeys);
    const matchedKeys = typedKeys.split('').filter((key, index) => key === keyboardKeys[index]);
    const accuracyPercentage = (matchedKeys.length / keyboardKeys.length) * 100;
    setAccuracy(accuracyPercentage.toFixed(2));
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes} min :${seconds} sec`;
  };

  return (
    <div>
      <h1>Typing Master</h1>
      <div className={styles.keyboardKeys}>{keyboardKeys}</div>
      <input type="text" value={text} ref= {inputRef} className={styles.keyboardInput}
       onChange={handleInputChange} disabled={endTime !== null} 
       placeholder='Type Here'/>
      <p>
        Score: {score}/{keyboardKeys.length}
      </p>
      {endTime ? (
        <p>Accuracy: {accuracy}%</p>
      ) : (
        <p>Time Remaining: {formatTime()}</p>
      )}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default TypingMaster;