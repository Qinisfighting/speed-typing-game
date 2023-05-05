//import './App.css';
import React, {useState, useEffect} from 'react';


export default function Quote(props){
    //const [quotes, setQuotes] = useState([])
    const [randomQuote, setRandomQuote] = useState('')

    useEffect(() => {
        async function fetchData(){
            const response = await fetch('https://type.fit/api/quotes')
            const data = await response.json()

            //setQuotes(data)
            let randomIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randomIndex])
        }
        fetchData()

    }, [])

    return (
        <div className='quoteCard'>
            {randomQuote && props.isshow ? (
              <>
                <p className='card-text'>&quot;{randomQuote.text}&quot;</p>
                <h5 className='card-author'> - {randomQuote.author || 'Author Unknown'} -</h5>
              </>  
            ) : <h5>Type the incoming quote in the box as fast and accurate as you can!</h5>}
        </div>
    )

}