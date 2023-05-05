import './App.css';
//import React, {useState, useEffect, useRef} from 'react';
import useTypeGame from "./hooks/useTypeGame"



function App() {

  const {formData, inputRef, handleChange, timeIsRunning, reset, timeRemaining, numOfWords} = useTypeGame()
  
  return (
    <div className="App">  
       <h2>How Fast Do You Type?</h2> 
       <textarea value={formData}
                 ref={inputRef}
                 onChange={handleChange}
                 disabled={!timeIsRunning}
                 style={timeIsRunning?{backgroundColor: '#07aa59'}
                 :{backgroundColor: 'grey',
                   color: 'darkgray',
                   cursor: 'not-allowed'                                                                    
                  }}                                                                         
                 />
       <button onClick={() => reset()} disabled={timeIsRunning} style={timeIsRunning?{backgroundColor: 'grey'}
                                                                                     :{color: 'lightgray'}}>
                                                                         
        Start</button>
       <h4>Time remaining: {timeRemaining}</h4>
       <h2>Word count: {numOfWords} </h2>
    </div>
  );
}
export default App;