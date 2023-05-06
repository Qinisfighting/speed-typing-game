import {useState, useEffect, useRef} from "react"

//this file is only for practicing writing custom hook, for this app it should be ideally  put into two component files, but not made into one custom hook.

export default function useTypeGame(startingTime = 10){
  const [formData, setFormData] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(startingTime)
  const [timeIsRunning, setTimeIsRunning] = useState(false)
  const [quotes, setQuotes] = useState([])
  const [randomQuote, setRandomQuote] = useState('')
  const [speed, setSpeed] = useState('')
  const [accuracy, setAccuracy] = useState('')
  const inputRef = useRef(null)


  useEffect(() => {
    async function fetchData(){
        const response = await fetch('https://type.fit/api/quotes')
        const data = await response.json()
        let randomIndex = Math.floor(Math.random() * data.length);
    setRandomQuote(data[randomIndex])
        setQuotes(data)
        
    }
    fetchData()
     
}, [])

    const getNewQuote = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex])

}  
  
  function handleChange(e) {
    const {value} = e.target
    setFormData(value)  
  }
  
  const calWordsCount = () => {   
    const wordsCount = formData
                      .trim() //trim to avoid white spaces are also counted as word
                      .split(' ')
                      .filter(word => word !== "")  //filter to avoid empty string is also counted as 1 word
    return  wordsCount.length  
  }
  
 


  const calAccuracy = () => {
    const achievedQuote = randomQuote.text
    console.log(achievedQuote)
//.split(' ').slice(0, calWordsCount())
             
return  achievedQuote
                                                
  }
 calAccuracy()   

function reset(){
  setTimeIsRunning(true)
  setTimeRemaining(startingTime)
  setFormData('')
  setSpeed('')
  getNewQuote()
  console.log(inputRef) //log out the whole textarea object unter current property
  inputRef.current.disabled = false
  inputRef.current.focus() 
}

  useEffect(() => {
    const wordInSecond = (startingTime/calWordsCount()).toFixed(2)
    // Run every 1000ms, without needing to rely on a re-render.
    if(timeIsRunning){
    const interval = setInterval(() => {
      setTimeRemaining(currentTime => {
        // If the current time is 0, then stop the interval and return 0.
        if(currentTime <= 0){
            
            clearInterval(interval);
            setTimeIsRunning(false);
            setSpeed(wordInSecond)
           
            return 0;
        }
     
        return currentTime - 1;
    }) 
    }, 1000);
    // Ensure you clear the interval on dismount.
    return () => clearInterval(interval)};
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [timeRemaining, timeIsRunning]);

return {formData, inputRef, handleChange, timeIsRunning, reset, timeRemaining, randomQuote, speed, accuracy} 
  
} 
  
