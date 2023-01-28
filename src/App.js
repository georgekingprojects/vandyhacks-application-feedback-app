import "./App.css";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { db } from "./firebase";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";

function App() {
  const [message, setMessage] = React.useState("");
  const [overallRating, setOverallRating] = React.useState(0);
  const [workshopsRating, setWorkshopsRating] = React.useState(0);
  const [foodRating, setFoodRating] = React.useState(0);
  const [teamAssignmentRating, setTeamAssignmentRating] = React.useState(0);
  const [speakersRating, setSpeakersRating] = React.useState(0);
  const [seeResults, setSeeResults] = React.useState(false);
  const [pageText, setPageText] = React.useState("See Results");
  const [reviews, setReviews] = React.useState([]);

  const [overallSum, setOverallSum] = React.useState(0);
  const [workshopsSum, setWorkshopsSum] = React.useState(0);
  const [foodSum, setFoodSum] = React.useState(0);
  const [teamAssignmentSum, setTeamAssignmentSum] = React.useState(0);
  const [speakersSum, setSpeakersSum] = React.useState(0);

  React.useEffect(() => {
    getReviews();

    let overall = 0;
    let workshops = 0;
    let food = 0;
    let teamAssignment = 0;
    let speakers = 0;
    for (let i = 0; i < reviews.length; i++) {
      overall = overall + reviews[i].overallRating;
      workshops = workshops + reviews[i].workshopsRating;
      food = food + reviews[i].foodRating;
      teamAssignment = teamAssignment + reviews[i].teamAssignmentRating;
      speakers = speakers + reviews[i].speakersRating;
    }
    setOverallSum(overall);
    setWorkshopsSum(workshops);
    setFoodSum(food);
    setTeamAssignmentSum(teamAssignment);
    setSpeakersSum(speakers);
  }, [seeResults]);

  async function getReviews() {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    let items = await [];
    await querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });

    await setReviews(items);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (message === "") {
      alert("Please add some comments!");
      return;
    }
    if (
      overallRating === 0 ||
      workshopsRating === 0 ||
      foodRating === 0 ||
      teamAssignmentRating === 0 ||
      speakersRating === 0
    ) {
      alert("Please add a rating for all areas!");
      return;
    }

    await addDoc(collection(db, "reviews"), {
      message: message,
      overallRating: overallRating,
      workshopsRating: workshopsRating,
      foodRating: foodRating,
      teamAssignmentRating: teamAssignmentRating,
      speakersRating: speakersRating,
    });

    setMessage("");
    window.location.reload(false);
    alert("Your feedback has been submitted!");
  }
  const handleOverallRating = (rate: number) => {
    setOverallRating(rate);
  };
  const handleWorkshopsRating = (rate: number) => {
    setWorkshopsRating(rate);
  };
  const handleFoodRating = (rate: number) => {
    setFoodRating(rate);
  };
  const handleTeamAssignmentRating = (rate: number) => {
    setTeamAssignmentRating(rate);
  };
  const handleSpeakersRating = (rate: number) => {
    setSpeakersRating(rate);
  };

  function changePages() {
    if (!seeResults) {
      setSeeResults(true);
      setPageText("Submit Feedback");
    } else {
      setSeeResults(false);
      setPageText("See Results");
    }
  }

  return (
    <div>
      <h2 style={{ paddingLeft: "1em" }} onClick={changePages}>
        {pageText}
      </h2>

      {!seeResults ? (
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
              <p>Overall</p>
              <Rating
                style={{ display: "flex", margin: "auto", width: "100%" }}
                onClick={handleOverallRating}
                allowHover={false}
              />
            </div>

            <div
              style={{
                display: "flex",
                margin: "auto",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <p>Workshops</p>
              <Rating
                style={{ display: "flex", margin: "auto", width: "100%" }}
                onClick={handleWorkshopsRating}
                allowHover={false}
              />
            </div>

            <div
              style={{
                display: "flex",
                margin: "auto",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <p>Food</p>
              <Rating
                style={{ display: "flex", margin: "auto", width: "100%" }}
                onClick={handleFoodRating}
                allowHover={false}
              />
            </div>

            <div
              style={{
                display: "flex",
                margin: "auto",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <p>Team Assignment</p>
              <Rating
                style={{ display: "flex", margin: "auto", width: "100%" }}
                onClick={handleTeamAssignmentRating}
                allowHover={false}
              />
            </div>

            <div
              style={{
                display: "flex",
                margin: "auto",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <p>Speakers</p>
              <Rating
                style={{ display: "flex", margin: "auto", width: "100%" }}
                onClick={handleSpeakersRating}
                allowHover={false}
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
      ) : (
        <div className="App">
          <h2>Results</h2>
          <p>Overall Average: {(overallSum / reviews.length).toFixed(2)} / 5</p>
          <p>
            Workshops Average: {(workshopsSum / reviews.length).toFixed(2)} / 5
          </p>
          <p>Food Average: {(foodSum / reviews.length).toFixed(2)} / 5</p>
          <p>
            Team Assignment Average:{" "}
            {(teamAssignmentSum / reviews.length).toFixed(2)} / 5
          </p>
          <p>
            Speakers Average: {(speakersSum / reviews.length).toFixed(2)} / 5
          </p>
          <h3>Comments</h3>
          {reviews.map((review) => {
            return (
              <div>
                <p>{review.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
