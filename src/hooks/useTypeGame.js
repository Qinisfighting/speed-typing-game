import {useState, useEffect, useRef} from "react"


export default function useTypeGame(startingTime = 10){
  const[formData, setFormData] = useState('')
  const[timeRemaining, setTimeRemaining] = useState(startingTime)
  const[timeIsRunning, setTimeIsRunning] = useState(false)
  const [numOfWords, setNumOfWord] = useState(0)
  const [speed, setSpeed] = useState('')
  const inputRef = useRef(null)

  
  function handleChange(e) {
    const {value} = e.target
    setFormData(value)  
  }
  
  function calWordsCount(formData){   
    const wordsCount = formData
                      .trim() //trim to avoid white spaces are also counted as word
                      .split(' ')
                      .filter(word => word !== "")  //filter to avoid empty string is also counted as 1 word
    return  wordsCount.length  
  }

  const [quotes, setQuotes] = useState([])
  const [randomQuote, setRandomQuote] = useState('')
  
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



function reset(){
  setTimeIsRunning(true)
  setTimeRemaining(startingTime)
  setFormData('')
  setNumOfWord(0)
  setSpeed('')
  getNewQuote()
  console.log(inputRef) //log out the whole textarea object unter current property
  inputRef.current.disabled = false
  inputRef.current.focus() 
}

  useEffect(() => {
    // Run every 1000ms, without needing to rely on a re-render.
    if(timeIsRunning){
    const interval = setInterval(() => {
      setTimeRemaining(currentTime => {
        // If the current time is 0, then stop the interval and return 0.
        if(currentTime <= 0){
            
            clearInterval(interval);
            setTimeIsRunning(false);
            setNumOfWord(calWordsCount(formData))
            
            setSpeed((10/numOfWords).toFixed(2))
           
            return 0;
        }
     
        return currentTime - 1;
    }) 
    }, 1000);
    // Ensure you clear the interval on dismount.
    return () => clearInterval(interval)};
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [timeRemaining, timeIsRunning]);

return {formData, inputRef, handleChange, timeIsRunning, reset, timeRemaining, numOfWords, randomQuote, speed} 
  
} 
  
