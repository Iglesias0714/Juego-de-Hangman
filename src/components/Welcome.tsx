import hangman from "../img/hangman.png";
import "../css/main.css";

export default function Welcome() {
  return (
    <>
      <div className="wrapper">
        <h1>Welcome To HANGMAN Game</h1>
        <p>The coolest classical game!</p>
        <img src={hangman} alt="Sammy Image" width={200} height={200} />
      </div>
    </>
  );
}