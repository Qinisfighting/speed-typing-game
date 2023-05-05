//import './App.css';
import React, {useState, useEffect} from 'react';



export default function Quote(props){
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

    return (
        <div className='quoteCard'>
            {randomQuote? (
              <>
                <p className='card-text'>&quot;{randomQuote.text}&quot;</p>
                <h5 className='card-author'> - {randomQuote.author || 'Author Unknown'} -</h5>
                <button onClick={getNewQuote}>Change Quote</button>  
              </>  
            ) : <h5>Loading...</h5>}
        </div>
    )

}