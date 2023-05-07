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
      <h2>Quote Typing Trainer</h2>
      <div className="quoteCard">
        {randomQuote ? (
          <>
            <p className="card-text">&quot;{randomQuote.text}&quot;</p>
            <h5 className="card-author">
              {" "}
              - {randomQuote.author || "Author Unknown"} -
            </h5>
          </>
        ) : (
          <h5>Loading...</h5>
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
            ? { backgroundColor: "#07aa59", color: "rgb(26, 25, 25)" }
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
          timeIsRunning ? { backgroundColor: "grey" } : { color: "lightgray" }
        }
      >
        Start
      </button>

      <h4>Time remaining: {timeRemaining}</h4>
      <h2>Per Word: {formData !== "" ? `${speed} s` : ` s`}</h2>
      <h2>Accuracy: {formData !== "" ? `${calAccuracy()} %` : ` %`} </h2>
    </div>
  );
}
export default App;
