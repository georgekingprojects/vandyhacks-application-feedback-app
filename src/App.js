import "./App.css";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { db } from "./firebase";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";

function App() {
  //message that user can leave about the hackathon
  const [message, setMessage] = React.useState("");

  //rating states for all the different criteria
  const [overallRating, setOverallRating] = React.useState(0);
  const [workshopsRating, setWorkshopsRating] = React.useState(0);
  const [foodRating, setFoodRating] = React.useState(0);
  const [teamAssignmentRating, setTeamAssignmentRating] = React.useState(0);
  const [speakersRating, setSpeakersRating] = React.useState(0);

  /*This is a boolean that toggles whether the user is viewing the submit page or the results page.
  I use conditional rendering with a ternary operator in the render function to control which page is viewed.
  If the app was more complex, I would probably use React Router instead, but since it is only 2 pages,
  I feel like the readability is not impacted that much.
  */
  const [seeResults, setSeeResults] = React.useState(false);

  //controls what the navigation button in the top left says.
  const [pageText, setPageText] = React.useState("View database data");

  //array of reviews that will be filled from a Firebase database
  const [reviews, setReviews] = React.useState([]);

  //These sums are used to calculate the average ratings for these categories.
  const [overallSum, setOverallSum] = React.useState(0);
  const [workshopsSum, setWorkshopsSum] = React.useState(0);
  const [foodSum, setFoodSum] = React.useState(0);
  const [teamAssignmentSum, setTeamAssignmentSum] = React.useState(0);
  const [speakersSum, setSpeakersSum] = React.useState(0);

  React.useEffect(() => {
    //gets the reviews from Firebase
    getReviews();

    //calculate the sums of each category rating, and set the state to use in average calculations
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

  //get the results from Firebase
  async function getReviews() {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    let items = await [];
    await querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });

    await setReviews(items);
  }

  //adds a submission to firebase when user presses submit
  async function handleSubmit(e) {
    e.preventDefault();

    //Checks to make sure all areas are filled in
    if (message === "") {
      alert("Please add some data!");
      return;
    }
    /*if (
      overallRating === 0 ||
      workshopsRating === 0 ||
      foodRating === 0 ||
      teamAssignmentRating === 0 ||
      speakersRating === 0
    ) {
      alert("Please add a rating for all areas!");
      return;
    }*/

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
    alert("Your data has been added to the database!");
  }

  //handles the rating states when user changes a rating
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

  //whenever the text in the top left is pressed, it changes pages between results and submission
  function changePages() {
    if (!seeResults) {
      setSeeResults(true);
      setPageText("Add Data");
    } else {
      setSeeResults(false);
      setPageText("View Database data");
    }
  }

  return (
    <div>
      {/*Navigation text */}
      <h2 className="navigationText" onClick={changePages}>
        {pageText}
      </h2>
      {/*This ternary determines whether the results page or the submission page is rendered. */}
      {!seeResults ? (
        /*Submission Page */
        <div className="App">
          <form onSubmit={handleSubmit}>
            <label className="formLabel">Enter some data below!</label>

            {/*Star ratings for all the categories */}
            {/*<div className="stars">
              <p>Overall</p>
              <Rating onClick={handleOverallRating} allowHover={false} />
            </div>
            <div className="stars">
              <p>Workshops</p>
              <Rating onClick={handleWorkshopsRating} allowHover={false} />
            </div>
            <div className="stars">
              <p>Food</p>
              <Rating onClick={handleFoodRating} allowHover={false} />
            </div>
            <div className="stars">
              <p>Team Assignment</p>
              <Rating onClick={handleTeamAssignmentRating} allowHover={false} />
            </div>
            <div className="stars">
              <p>Speakers</p>
              <Rating onClick={handleSpeakersRating} allowHover={false} />
      </div>*/}

            {/*Box to add comments to your review*/}
            <textarea
              className="commentBox"
              rows="6"
              cols="10"
              type="text"
              placeholder="Type some random stuff to add to the database..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        /*This is the results page, the else part of the ternary for conditional rendering */
        <div className="App">
          <h2>Data</h2>
          {/*Displays averages for all the categories */}
          {/*<p>Overall Average: {(overallSum / reviews.length).toFixed(2)} / 5</p>
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
      </p>*/}

          {/*Displays all the comments written by users. */}
          {/*<h3>Data</h3>*/}
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
