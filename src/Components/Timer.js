import React, {useEffect, useState} from 'react'

function Timer() {

    const [workDur, setWorkDur] = useState(25);
    const [breakDur, setBreak] = useState(5);
    const [workSec, setWorkSec] = useState(1500)
    const [breakSec, setBreakSec] = useState(300);
    const [type, setType] = useState("work");
    const [flag, setFlag] = useState(false);
    const [resetFlag, setResetFlag] = useState(true);


    function formatSpecifer(seconds){
      let min = parseInt(seconds / 60).toString();
      let sec = parseInt(seconds % 60).toString();

      if(sec.length === 1){
        sec = '0' + sec;
      }
      if(min.length === 1){
        min = '0' + min;
      }
      return min + " : " + sec;
    }

    useEffect(()=>{
      if(flag  && type === "work"){
        if(workSec > 0){
          setTimeout(()=>setWorkSec(workSec - 1), 1000)
        }

        if(workSec === 0){
          alert("Break Time Started!")
          setType("break");
          setWorkSec(1500)
        }
      }
      

      if(flag && type === "break"){
        if(breakSec > 0){
          setTimeout(()=>setBreakSec(breakSec - 1), 1000)
        }
        if(breakSec === 0){
          setType("work")
          alert("Break Time Ended!")
          setBreakSec(300)
        }
      }
        
      
    }, [workSec, breakSec, flag, type])

    function handleReset(){
      setWorkDur(25);
      setBreak(5);
      setWorkSec(1500);
      setBreakSec(300);
      setType("work");
      setFlag(false);
      setResetFlag(true);
    }

    function handleSubmit(e){
      e.preventDefault()
      setWorkSec(workDur * 60)
      setBreakSec(breakDur * 60)
    }

  return (
    <div className='card'>
      <h2>{type === "work" ? formatSpecifer(workSec) : formatSpecifer(breakSec)}</h2>
      <h2>{type === "work" ? "Work" : "Break"} - Time</h2>

      <button onClick={()=>{
        setFlag(true)
        setResetFlag(false)}} disabled={flag} >Start</button>

      <button onClick={()=>{
        setFlag(false)
        setResetFlag(false)
      }} disabled={!flag} >Stop</button>

      <button disabled={resetFlag} onClick={handleReset}>Reset</button><br/>

      <form onSubmit={handleSubmit}>
        <input type="number" value={workDur} placeholder='Work Duration' onChange={(e)=>setWorkDur(e.target.value)}/>
        <input type="number" value={breakDur} placeholder='Break Duration' onChange={(e)=>setBreak(e.target.value)}/>
        <input type='submit' value="Set"/>
      </form>
    </div>
  )
}

export default Timer
