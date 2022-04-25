import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = (props) => {
  const [candidate1URL, setCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, setCandidate2Url] = useState(LoadingCircles);
  const [candidate3URL, setCandidate3Url] = useState(LoadingCircles);
  const [candidate4URL, setCandidate4Url] = useState(LoadingCircles);

  const [showresults, setResultsDisplay] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const [candidate1Votes, setVote1] = useState("--");
  const [candidate2Votes, setVote2] = useState("--");
  const [candidate3Votes, setVote3] = useState("--");
  const [candidate4Votes, setVote4] = useState("--");

  const [prompt, setPrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // setting vote count
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      setVote1(voteCount[0]);
      setVote2(voteCount[1]);
      setVote3(voteCount[2]);
      setVote4(voteCount[3]);

      // setting images

      setCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      setCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );
      setCandidate3Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate3"),
        })
      );
      setCandidate4Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate4"),
        })
      );

      setPrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      setResultsDisplay(didUserVote);
      setButtonStatus(didUserVote);
    };

    const checkLogin = () => {
      if (localStorage.getItem("undefined_wallet_auth_key") === null) {
        window.location.replace("http://localhost:1234/");
      }
    };

    checkLogin();
    getInfo();
  }, []);

  const addVote = async (index) => {
    setButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    setVote1(voteCount[0]);
    setVote2(voteCount[1]);
    setVote3(voteCount[2]);
    setVote4(voteCount[3]);
    setResultsDisplay(true);
  };

  return (
    <Container style={{ minHeight: "220vh" }}>
      {/* @ 1st row */}
      <Row style={{ marginTop: "5vh" }}>
        <Col className="justify-content-center d-flex align-items-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#f6f8ff",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "1.25rem",
            }}
          >
            {prompt}
          </div>
        </Col>
      </Row>
      {/* @ 1st row ends */}

      {/* @ 2st row */}
      <Row>
        <Col className="jutify-content-center d-flex">
          <Container>
            <Row
              style={{
                marginTop: "5vh",
                backgroundColor: "#f6f8ff",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate1URL}
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className="justify-content-center d-flex"
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#f6f8ff",
                    borderRadius: "0.4rem",
                  }}
                >
                  {candidate1Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className="justify-content-center d-flex"
            >
              <Button disabled={buttonStatus} onClick={() => addVote(0)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>

        <Col className="jutify-content-center d-flex">
          <Container>
            <Row
              style={{
                marginTop: "5vh",
                backgroundColor: "#f6f8ff",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate2URL}
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className="justify-content-center d-flex"
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#f6f8ff",
                    borderRadius: "0.4rem",
                  }}
                >
                  {candidate2Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className="justify-content-center d-flex"
            >
              <Button disabled={buttonStatus} onClick={() => addVote(1)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
      {/* @ 2st row ends */}

      {/* @ 3nd row */}
      <Row>
        <Col className="jutify-content-center d-flex">
          <Container>
            <Row
              style={{
                marginTop: "5vh",
                backgroundColor: "#f6f8ff",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate3URL}
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className="justify-content-center d-flex"
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#f6f8ff",
                    borderRadius: "0.4rem",
                  }}
                >
                  {candidate3Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className="justify-content-center d-flex"
            >
              <Button disabled={buttonStatus} onClick={() => addVote(2)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>

        <Col className="jutify-content-center d-flex">
          <Container>
            <Row
              style={{
                marginTop: "5vh",
                backgroundColor: "#f6f8ff",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate4URL}
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className="justify-content-center d-flex"
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#f6f8ff",
                    borderRadius: "0.4rem",
                  }}
                >
                  {candidate4Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className="justify-content-center d-flex"
            >
              <Button disabled={buttonStatus} onClick={() => addVote(3)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
      {/* @3nd row ends */}
    </Container>
  );
};

export default PollingStation;
