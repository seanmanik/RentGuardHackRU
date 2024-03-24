// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import AgreementList from "./components/agreement-list.component";
import PolicyDisplay from "./components/policy-display.component";
import EditAgreement from "./components/edit-agreement.component.js";
import CreateAgreement from "./components/create-agreement.component";
import EditPolicy from "./components/edit-policy.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/agreement" component={AgreementList} />
        <Route path="/policy" component={PolicyDisplay} />
        <Route path="/editAgreement" component={EditAgreement} />
        <Route path="/createAgreement" component={CreateAgreement} />
        <Route path="/editPolicy" component={EditPolicy} />
      </div>
    </Router>
  );
}

export default App;
