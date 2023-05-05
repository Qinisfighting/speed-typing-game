import './App.css';
//import React, {useState, useEffect} from 'react';
import useTypeGame from "./hooks/useTypeGame"
import Quote from "./components/quotes"



function App() {

  const {formData, inputRef, handleChange, timeIsRunning, reset, timeRemaining, numOfWords} = useTypeGame()
 
  

  
  
  return (
    <div className="App">  
       <h2>Type fast and get inspired</h2>
       <Quote />   
        
       <textarea value={formData}
                 placeholder={!timeIsRunning&&'Type the exact quote here as fast as you can!'}
                 ref={inputRef}
                 onChange={handleChange}
                 disabled={!timeIsRunning}
                 style={timeIsRunning?{backgroundColor: '#07aa59', color: 'rgb(26, 25, 25)',}
                 :{backgroundColor: 'lightgrey',
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