import React, { useState, useEffect , useRef} from 'react';
 
import styles from "../Styles/Typemaster.module.css"
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../Reducer/authActions';

const TypingMaster = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(300);
  const [accuracy, setAccuracy] = useState(0);
  const navigate = useNavigate();
  const user= useSelector((store)=>store)
  
  console.log(user)
  //It is used for input focus
  const inputRef= useRef(null);
  const dispatch= useDispatch();

  const keyboardKeys = 'asdfjkldnf;';

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  //handling timer function and side effects here
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
    //   setScore(score + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };


//Using Restart function here
  const handleRestart = () => {
    setText('');
    setCurrentIndex(0);
    setScore(0);
    setStartTime(null);
    setEndTime(null);
    setTimer(300);
    setAccuracy(0);
  };

  //Calculate accuracy section
  const calculateAccuracy = () => {
    const typedKeys = text.slice(0, keyboardKeys.length);
    //  console.log(typedKeys);
    
    const matchedKeys = typedKeys.split('').filter((key, index) => key === keyboardKeys[index]);
    const accuracyPercentage = (matchedKeys.length / keyboardKeys.length) * 100;
    setAccuracy(accuracyPercentage.toFixed(2));
  };

  const handleInputChange = (event) => {
//    console.log( keyboardKeys.split(""))
//    console.log(event.target.value)
    setText(event.target.value);
    setScore(event.target.value.length)
    
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes} min :${seconds} sec`;
  };

  const handleLogin =()=>{
    navigate("/login")
    
  }

  const handleLogout =()=>{
    dispatch(logout())
  }
  return (
    <div>
      <div id='navbar' className={styles.navbar}>
        <button id='buttonLogo' onClick={()=>{
          navigate("/")
        }}>
          Home
        </button>

        {/* <button className='logout' onClick={handleLogin}>
            Login
          </button> */}
        {
          user.isLoggedIn===false?
          <button className='logout' onClick={handleLogin}>
            Login
          </button>
           : <div className={styles.logoDiv}>
           <h1>Welcome ! </h1>
           <button className='logout' onClick={handleLogout}>Logout</button>
           </div> 
        }
         
       
      </div>
    <div className={styles.container}>
      
      <h1>Typing Master</h1>
      <div className={styles.keyboardKeys}>{keyboardKeys}</div>
      <input type="text" value={text} ref= {inputRef} className={styles.keyboardInput}
       onChange={handleInputChange} disabled={endTime !== null } 
       placeholder='Type Here'/>
      <p>
        No. of keys pressed: {score}
      </p>
      {/* <p>Speed : {Math.floor((+score/5 )/1)} WPM</p> */}
      {endTime ? (
        <p>Speed : {Math.floor((+score/5 )/1)} WPM  {  '||' } Accuracy: {accuracy}%</p> 
        
      ) : (
        <p>Time Remaining: {formatTime()}</p>
      )}
      
      <button onClick={handleRestart}>Restart</button>
    </div>
  </div>
  );
};

export default TypingMaster;