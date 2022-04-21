import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [candidate3URL, changeCandidate3Url] = useState(LoadingCircles);
  const [candidate4URL, changeCandidate4Url] = useState(LoadingCircles);

  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);

  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [candidate3Votes, changeVote3] = useState("--");
  const [candidate4Votes, changeVote4] = useState("--");

  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);
      changeVote3(voteCount[2]);
      changeVote4(voteCount[3]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );
      changeCandidate3Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate3"),
        })
      );
      changeCandidate4Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate4"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
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
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeVote3(voteCount[2]);
    changeVote4(voteCount[3]);
    changeResultsDisplay(true);
  };

  return (
    <Container style={{ minHeight: "200vh" }}>
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

      {/* @ 1st row */}
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
      {/* @ 1st row ends */}

      {/* @ 2nd row */}
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
      {/* @2nd row ends */}
    </Container>
  );
};

export default PollingStation;
