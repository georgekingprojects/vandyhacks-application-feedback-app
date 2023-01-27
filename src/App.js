import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Rating } from "react-simple-star-rating";

function App() {
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState(0);
  async function handleSubmit(e) {
    e.preventDefault();
  }
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  return (
    <div className="App">
      <form className="app__form" onSubmit={handleSubmit}>
        <label>Send your feedback to VandyHacks!</label>
        <input
          type="text"
          placeholder="Your comments here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Rating onClick={handleRating} />

        <button type="submit">Submit</button>
      </form>
      <p>{rating}</p>
    </div>
  );
}

export default App;
