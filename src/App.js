import "./App.css";
import Headshot from "./Components/Headshot";
import Social, { Twitter, GitHub, Email } from "./Components/Socials";
import getBackground from "./Components/Backgrounds";

function App() {
  const bg = getBackground();
  return (
    <div className="App">
      {bg}
      <div className="foreground">
        <div className="contents">
          <Headshot email={process.env.REACT_APP_EMAIL}></Headshot>
          <h1>{process.env.REACT_APP_NAME}</h1>
          <h2>{process.env.REACT_APP_TITLE}</h2>
          <a className="book-me button-like" href={process.env.REACT_APP_BOOKING}>
            <p>BOOK ME</p>
          </a>
          <div className="socials">
            <Social logo={GitHub} href={process.env.REACT_APP_GITHUB}></Social>
            <Social logo={Email} href={`mailto:${process.env.REACT_APP_EMAIL}`}></Social>
            <Social logo={Twitter} href={process.env.REACT_APP_TWITTER}></Social>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
