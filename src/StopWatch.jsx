import React, {useState, useEffect, useRef} from "react"

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false)
    const [elapsedtime, setElapsedtime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(()=>{

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedtime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return() => {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning])

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedtime;
    }

    function stop(){
        setIsRunning(false)
    }

    function reset(){
        setElapsedtime(0);
        setIsRunning(false);
    }

    function formatTime(){

        let hours = Math.floor(elapsedtime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedtime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedtime / (1000) % 60)
        let milliseconds = Math.floor((elapsedtime % 1000) /10)

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start-btn" onClick={start}>Start</button>
                <button className="stop-btn" onClick={stop}>Stop</button>
                <button className="reset-btn" onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch