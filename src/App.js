import "./App.css";
import useTypeGame from "./hooks/useTypeGame";

function App() {
  const {
    formData,
    inputRef,
    handleChange,
    timeIsRunning,
    reset,
    timeRemaining,
    randomQuote,
    speed,
    calAccuracy,
  } = useTypeGame();

  return (
    <div className="App">
      <h2 className="title">Quote Typing Trainer</h2>
      <div className="quoteCard">
        {randomQuote ? (
          <>
            <h3 className="card-text">&quot;{randomQuote.text}&quot;</h3>
            <h3 className="card-author">
              {" "}
              - {randomQuote.author || "Author Unknown"} 
            </h3>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>

      <textarea
        value={formData}
        placeholder={
          timeIsRunning? '' : 'Type the exact quote here as fast as you can! (Case, Whitespace and Punctuation are sensitive.)'
        }
        ref={inputRef}
        onChange={handleChange}
        disabled={!timeIsRunning}
        style={
          timeIsRunning
            ? { backgroundColor: "rgb(33, 45, 70)", color: "white" }
            : {
                backgroundColor: "lightgrey",
                color: "darkgray",
                cursor: "not-allowed",
                
              }
        }
      />
      <button
        onClick={() => reset()}
        disabled={timeIsRunning}
        style={
          timeIsRunning ? { backgroundColor: "lightgray", cursor:"not-allowed" } : { color: "var(--font)" }
        }
      >
        START
      </button>

      <h3>Time Remaining: {timeRemaining}</h3>
      <h3>Per Word: {formData !== "" ? `${speed} s` : ` s`}</h3>
      <h3>Accuracy: {formData !== "" ? `${calAccuracy()} %` : ` %`} </h3>
      <hr />
    </div>
    
  );
}
export default App;
