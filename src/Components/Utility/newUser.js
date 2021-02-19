import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'


class newUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = "signup";
        this.props
            .onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/authenticate/signin");
            })
            .catch(() => {
                return;
            });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { username, email, password } = this.state;
        const { errors, removeError, history } = this.props;
        history.listen(() => {
            removeError();
        });
        return (
            <div className="form" >
                <p className="form-title">
                    Create a new account
            </p>
                <p className="form-subtitle">
                    Get started! It is as simple as it gets
            </p>
                <form className="formclass" onSubmit={this.handleSubmit}>
                    {errors.message && (
                        <div className="alert alert-danger" role="alert">{errors.message}</div>
                    )}
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        onChange={this.handleChange}
                        required
                    />
                  
                    <br />
                    <button className="form-submit form-submit-new">
                        Let's go!
            </button>
                </form>
                <p className="form-bottom-text">
                    Already have an account?
                <NavLink to="/authenticate/signin"> Log In!</NavLink>
                </p>
            </div>
        )
    };
}

export default withRouter(newUser);