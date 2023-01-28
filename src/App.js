import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { db } from "./firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

function App() {
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [seeResults, setSeeResults] = React.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (message === "") {
      alert("Please add a message!");
      return;
    }
    if (rating === 0) {
      alert("Please add a rating!");
      return;
    }

    await addDoc(collection(db, "reviews"), {
      message: message,
      rating: rating,
    });

    setMessage("");

    alert("Your feedback has been submitted!");
  }
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="App">
      <form className="app__form" onSubmit={handleSubmit}>
        <label
          style={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            fontSize: 23,
          }}
        >
          Send your feedback to VandyHacks!
        </label>

        <div
          style={{
            display: "flex",
            margin: "auto",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Rating
            style={{ display: "flex", margin: "auto", width: "100%" }}
            onClick={handleRating}
          />
        </div>

        <textarea
          style={{
            display: "flex",
            margin: "auto",
            width: "40%",
            fontSize: 23,
            borderRadius: "3px",
          }}
          rows="6"
          cols="10"
          type="text"
          placeholder="Your comments here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          style={{
            display: "flex",
            margin: "auto",
            marginTop: "1em",
            padding: ".4em",
            borderRadius: "3px",
            fontSize: 23,
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
