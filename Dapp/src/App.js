import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { login, logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Detail from "./Components/Details";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";
import Footer from "./Components/Footer";
import CandInfo from "./Data/CandidateInfo.json";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getCandidates = () => {
    fetch("http://localhost:8080/api/discuss/candidate/getAllCandidates")
      .then(response => response.json())
      .then(json => {
          setItems(json);
          setLoaded(true);
      })
  };

  useEffect(() => {
      getCandidates();
  }, []);

  const setCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidateList({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("Candidate3", namePair[2]);
    localStorage.setItem("Candidate4", namePair[3]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  const CandWithId = ({match}) => {
    return(
        <Detail item={items.filter((item) => item.id === parseInt(match.params.itemId,10))[0]}
        />
    );
  };

  return (
    <>
    <Router>
      <Navbar collapseOnSelect expand="lg" style={{background: "#3AAFA9"}} variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <h1>Coalesce Forum</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto"></Nav>
            <Nav>
              <Nav.Link href="/Contact">Contact Us</Nav.Link>
              <Nav.Link href="/About">About Us</Nav.Link>
              <Nav.Link href="/NewPoll">New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home changeCandidates={setCandidatesFunction} />
        </Route>
        <Route path="/candidate/:itemId" component={CandWithId} />
        <Route exact path="/Contact">
          <Contact />
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
        <Route exact path="/PollingStation">
          <PollingStation />
        </Route>
        <Route exact path="/NewPoll">
          <NewPoll />
        </Route>
      </Switch>
    <Footer />
    </Router>
    </>
  );
}