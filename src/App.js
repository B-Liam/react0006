import React from 'react';
import './App.css';
import './css/Pomodoro.css';

function Pomodoro() {

  /* sets whether the timer countdown starts by using a useEffect function that detects when this value has changed, triggered by pressing the play button */
  const [timerPower, setTimerPower] = React.useState(false);
    
  /* when the timer hits zero, it toggles the state of the label, false will mean the display will show Session, and true will mean Break */
  const [breakLabel, setBreakLabel] = React.useState(false);
    
  /* this is set depending on the state shown for breakLabel */
  const [label, setLabel] = React.useState("Session");
    
  /* this are used in the Set Session area and is independent of the timer display area */
  const [sessionMinutes, setSessionMinutes] = React.useState(25);
  
  /* this is used in the Set Break area */
  const [breakMinutes, setBreakMinutes] = React.useState(5);
    
  /* these are used to display the values in the countdown timer itself. The default values are what are shown in the clock face */
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState("00");
    
  /* Behind the scenes state, that turns minutes into seconds, and then counts down. The display is updated by using this value to trigger changes in the display - but does not use this state directly */
  const [countDown, setCountDown] = React.useState(1500);
  
  /* A key constant that enables the audio element to be referenced when the play button is called. It needs a useEffect to come come active on page load, only running once.*/
  const audioReference = React.useRef();
  
  /* decreases the break duration */
  function decreaseBreak(){
    if (breakMinutes > 1) {
       setBreakMinutes(breakMinutes - 1)  
    }
  }
  
  /* increases the break duration */
  function increaseBreak(){
    if (breakMinutes <= 59) {
       setBreakMinutes(breakMinutes + 1)
    }
  }
    
  /* decreases the sesion duration */
  function decreaseSession(){
    if (sessionMinutes > 1) {
      setSessionMinutes(sessionMinutes - 1)
    }
  }
  
  /* increases the sesion duration */
  function increaseSession(){
    if (sessionMinutes <= 59) {
       setSessionMinutes(sessionMinutes + 1)  
    }
  }
  
  /* This allows for the clock face display to be updated when the session duration is changed, but only if the timer is not running */  
  React.useEffect(() => {
    if (!timerPower) {
      setCountDown(sessionMinutes * 60);
      setMinutes(sessionMinutes);
      setSeconds("00")
    }
  }, [sessionMinutes]);
    
  /* Short but essential, it switches on the countdown timer, triggering a useEffect that controls it */ 
  function useTimer(){
    setTimerPower(!timerPower);
  }
  
  /* All the logic needed to pass the FCC tests, to reset everything to its default state, including turning the alarm off. */ 
  function resetTimer() {
    setBreakLabel(false);
    setLabel("Session");
    setBreakMinutes(5);
    setSessionMinutes(25);
    setMinutes(25);
    setSeconds("00")
    setCountDown(1500);
    setTimerPower(false);
    playDrumBeat("off");
  }
  
  /* the function that is called to change the label in the clock face display */
  function changeLabel(){
    if (breakLabel === false) {
      setLabel("Session") 
    }
    if (breakLabel === true) {
      setLabel("Break");
    }
  }
  
  /* the Boolean that controls that the timer label logic */  
  function toggleBreakLabel(){
    setBreakLabel(!breakLabel);
  }
  
  /* loaded on first mount only, it enables the audio beep reference to work in the playDrumBeat function */  
  React.useEffect(() => {
      const audioBeep = audioReference.current;
      console.log(audioBeep);
    }, []);
    
  /* plays the sound, it accepts an argument to turn the sound off if the reset button is pressed */  
  function playDrumBeat(str) {
    const audioBeep = audioReference.current;
    if (str === "off") {
    audioBeep.pause();
    audioBeep.currentTime = 0;
    } else {
    audioBeep.play();
    }
    }
  
  /* the master countdown function that starts when the play button is pressed, and recognises this through useEffect */
  React.useEffect(() => {
      let interval = null;
      let countDisplay = countDown -1;
      
    if (timerPower && countDown >= 1) {
      
      /* set interval is a core javescript function that repeats every period, the period is declared at the end of the function */
      interval = setInterval(() => {
        
      /* the background function that decreases the seconds by one on every interval */  
      setCountDown(countDown => countDown - 1);
      
      /* this is a crucial step to prevent an 'out by one' error - without it, it appears the timer takes two seconds to start */  
      let countDisplay = countDown -1;
      const minutesRemaining = Math.floor(countDisplay / 60);
      const secondsRemaining = countDisplay % 60;
      changeLabel();
        
      /* the logic that means the timer display is always mm:ss */  
      if (minutesRemaining < 10 ) {
      setMinutes("0" + minutesRemaining);
      } else {
      setMinutes(minutesRemaining);  
      };
        
      if (secondsRemaining < 10 ) {
      setSeconds("0" + secondsRemaining);
      } else {
      setSeconds(secondsRemaining);  
      };
      }, 1000)    
    } 
    
    /* starts the break when the timer reaches 0 - note that the countdown has a plus one to allow it to show the full break time of 5 minutes rather than 4.59. */ 
    else if (timerPower && countDown === 0 && breakLabel === false) {
      setCountDown((breakMinutes * 60)+1);
      setBreakLabel(true); 
      playDrumBeat();
    }
    
    /* starts the session again when the break is over at 0 - note that the countdown has a plus one to allow it to show the full break time of 5 minutes rather than 4.59. */ 
    else if (timerPower && countDown === 0 && breakLabel === true) {
      setCountDown((sessionMinutes * 60)+1);
      setBreakLabel(false);
      playDrumBeat();
      }
    
    /* clears the useState and stops interval to prevent memory leaks */
      else if (!timerPower && countDown !== 1) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerPower, countDown]);
    
   
   return (
    <div id="wrapper">
      <div id="timer-container"> 
        <div className="icon-size" id="header-area">
        <i style={{'font-size':'4em','color':'#ffffff'}} class="fab fa-react"></i>
        <h1> Liam's<br /> Pomodoro Timer</h1>
         </div>
      <div id="controls-area">
      <div id="break-label">
        <h2>Set Break</h2>
          <a id="break-decrement" onClick={decreaseBreak} href="#"><i class="fas fa-chevron-circle-down"></i></a>
          <span style={{'font-size':'2em','padding':'0 2% 0 2%'}} id="break-length">{breakMinutes}</span>
          <a id="break-increment" onClick={increaseBreak} href="#"><i class="fas fa-chevron-circle-up"></i></a>
       </div>
      <div id="session-label">
        <h2>Set Session</h2>
       <a id="session-decrement" onClick={decreaseSession} href="#"><i class="fas fa-chevron-circle-down"></i></a>
       <span style={{'font-size':'2em','padding':'0 2% 0 2%'}} id="session-length">{sessionMinutes}</span>
        <a id="session-increment" onClick={increaseSession} href="#"><i class="fas fa-chevron-circle-up"></i></a>
       </div>
      </div>
       <div id="timer-face">
         <div id="circle">
         <h2 id="timer-label" style={{'padding-top':'25px'}}>{label}</h2>
         <div id="time-left" style={{'font-size':'3em'}}>{minutes}:{seconds}</div>
         </div>
         </div>
        <div id="timer-start-stop">
         <p style={{'font-size': '2em'}}>
           <a id="start_stop" onClick={useTimer} href="#"><i class="fas fa-play-circle"></i></a>
           <a id="pause" onClick={useTimer} href="#"><i class="fas fa-pause-circle"></i></a>
           <a id="reset" onClick={resetTimer} href="#"><i class="fas fa-undo-alt"></i></a>
         </p>
          </div>
     </div>
       <audio id="beep" ref={audioReference} src="https://www.quickstartdigital.co.uk/images/uploads/music/drum-beat.mp3" />
     </div>
   ) 
  }
  


export default Pomodoro;
