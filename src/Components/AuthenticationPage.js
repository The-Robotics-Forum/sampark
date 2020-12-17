import React from 'react';
import Icon from '../Assests/Images/icon-logo-2.png'

// import RoomSignIn from './Utility/roomSignIn';
import UserSignIn from './Utility/userSignIn';
import NewUser from './Utility/newUser';

import FooterIcon from '../Assests/Images/single-icon.png';
import FacebookIcon from '../Assests/Images/facebook.png';
import TwitterIcon from '../Assests/Images/twitter.png';

import './AuthenticationPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { removeError } from "../store/actions/error";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";

function AuthenticationPage(props) {
    const {authUser, errors ,currentUser, removeError} = props;

    let component = null;   // This will be the component on the right side
    let title = "";
    let subtitle = "";  // These two will be on the left side

    if (props.match.params.type === "signin"){
        component = <UserSignIn currentUser={currentUser} onAuth={authUser} errors={errors} removeError={removeError} {...props}/>
        title = "Welcome Back!";
        subtitle = "Nice to see you again"
    }
    else if (props.match.params.type === "signup"){
        component = <NewUser onAuth={authUser} errors={errors} removeError={removeError}  {...props}/>
        title = "Hello there!";
        subtitle = "Get started with your team";
    }
    else{
        console.log("Not Found")
        props.history.push("/notfound")
    } 
        
    // else if (props.match.params.type === "")


    return (
        <div className="auth-page container-fluid">
            <div className="row">
            <div className="left col-md-6">
                <div className="icon-section-auth">
                    <img src={Icon} alt="icon" className="icon" onClick={() => alert("ICON")} />
                </div>
                <div className="welcome-text">
                    <p className="welcome-text-title">
                        {title}
                    </p>
                    <p className="welcome-text-subtitle">
                        {subtitle}
                    </p>
                </div>
            </div>
            <div className="right col-md-6">
                {component}
            </div>
            <div className="footer col-12">
                <div className="bottom-icon">
                    <img src={FooterIcon} alt="footer-icon" className="img-fluid"/>
                </div>
                <div className="spacer"></div>
                <div className="footer-contents">
                    <p style={{margin: "auto 0"}}>
                        Contact Us
                    </p>
                    <div className="bottom-icon">
                        <img src={FacebookIcon} alt="facebook-icon "/>
                    </div>
                    <div className="bottom-icon">
                        <img src={TwitterIcon} alt="twitter-icon "/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      errors: state.errors
    };
  }

  
export default connect(mapStateToProps,{authUser,removeError})(AuthenticationPage)