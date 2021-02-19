import React from 'react';
import { Button } from './Button'
import { Link } from "react-router-dom";
// import Icon from '../Assests/Images/icon-logo.png'
// import FooterIcon from '../Assests/Images/single-icon.png';
// import FacebookIcon from '../Assests/Images/facebook.png';
// import TwitterIcon from '../Assests/Images/twitter.png';
import './Welcome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// export default function Welcome () {
//     return (
//         <div className="welcome-background">
//             <div className="icon-section">
//                 <img src={Icon} alt="logo"></img>
//             </div>
//         </div>
//     )
// }
export default function Welcome({
    props,
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headLine,
    description,
    buttonLabel,
    img,
    alt,
    imgStart,
}) {
    return (
        <>
        <div id="services"
          className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}
        >
          <div className="container">
            <div
              className="row home__hero-row"
              style={{
                display: "flex",
                flexDirection: imgStart === "start" ? "row-reverse" : "row",
              }}
            >
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{topLine}</div>
                  <h1 className={lightText ? "heading" : "heading dark"}>
                    {headLine}
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    {description}
                  </p>
                  <Link to="/sign-up">
                    <Button className="btn" buttonSize="btn--wide" buttonColor="blue" onClick={() => props.history.push("/authenticate/signup")}>
                      {buttonLabel}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img src={img} alt={alt} className="home__hero-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}