import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { configureStore } from "../src/store";
import { setAuthorizationToken, setCurrentUser } from "../src/store/actions/auth";
// import Welcome from './Components/Welcome'
import NotFound from './Components/404Error';
import AuthenticationPage from './Components/AuthenticationPage'
import RoomPage from './Components/RoomPage';
import MainChatWindow from './Components/MainChat/mainChatWindow';
import Navbar from './Components/Navbar';
import Home from './Components/pages/HomePage/Home';
import Services from './Components/pages/Services/Services';
import Developers from './Components/pages/Developers/Developers';
import Footer from './Components/pages/Footer/Footer';

import './Components/ScrollBar.css'
import './prism.css';
import './App.css';


const store = configureStore();

function App() {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
  }

  // Check if the user data is loaded
  if (store.getState().currentUser.user)

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" exact strict component={Home} />
              <Route path="/services" exact strict component={Services} />
              <Route path="/developers" exact strict component={Developers} />

              <Route path="/authenticate/:type" exact strict component={AuthenticationPage} />
              <Route path="/chat" exact strict component={MainChatWindow} />
              <Route path="/rooms" exact strict component={RoomPage} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
}

export default App;
