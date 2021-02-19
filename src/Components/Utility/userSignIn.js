import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
// import { render } from '@testing-library/react';
import currentUser from '../../store/reducers/currentUser';

class UserSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: ""
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = "login";
        this.props
            .onAuth(authType, this.state)
            .then(() => {
                if(this.props.currentUser.isAuthenticated){
                    this.props.history.push("/rooms");
                }
            })
            .catch((error) => {
                alert(error);
                return;
            });
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        
        const { errors, removeError,history} = this.props;
        history.listen(() => {
            removeError();
          });
        return (
            <div className="form">
                <p className="form-title">
                    Sign in to your account
            </p>
                <p className="form-subtitle">
                    Enter your email ID password
            </p>
            <form className="formclass form-group" onSubmit={this.handleSubmit}>
            {errors.message && (
                <div className="alert alert-danger" role="alert">{errors.message}</div>
              )}
                <input
                    id="email"
                    type="email"
                    placeholder="someone@domain.com"
                    name="email"
                    required
                    onChange={this.handleChange}
                    className="form-control"

                />
                <input
                    id="password"
                    type="password"
                    placeholder="*******"
                    name="password"
                    required
                    onChange={this.handleChange}
                    className="form-control"
                />
                <br />
                <button className="form-submit form-submit-new form-control">
                    Let's go!
            </button>
            </form>
                <p className="form-bottom-text">
                    Don't have an account yet?
                <NavLink to="/authenticate/signup"> Create One!</NavLink>
                </p>
            </div>
        );
    }
}
export default withRouter(UserSignIn);