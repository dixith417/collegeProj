import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();
  const candidateName3 = useRef();
  const candidateName4 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();
  const candidateName3URL = useRef();
  const candidateName4URL = useRef();

  const promptRef = useRef();

  const [disableButton, setDisableBtn] = useState(false);

  const sendToBlockChain = async () => {
    if (
      candidateName1.current.value === "" ||
      candidateName1.current.value === null ||
      candidateName2.current.value === "" ||
      candidateName2.current.value === null ||
      candidateName3.current.value === "" ||
      candidateName3.current.value === null ||
      candidateName4.current.value === "" ||
      candidateName4.current.value === null ||
      candidateName1URL.current.value === "" ||
      candidateName1URL.current.value === null ||
      candidateName2URL.current.value === "" ||
      candidateName2URL.current.value === null ||
      candidateName3URL.current.value === "" ||
      candidateName3URL.current.value === null ||
      candidateName4URL.current.value === "" ||
      candidateName4URL.current.value === null
    ) {
      alert("Probably the form feilds are empty ! Please check again.");
      return;
    }

    setDisableBtn(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName3.current.value,
      url: candidateName3URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName4.current.value,
      url: candidateName4URL.current.value,
    });

    await window.contract.setCandidateList({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
      name3: candidateName3.current.value,
      name4: candidateName4.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("Poll created successfully, go to home!");
  };

  useEffect(() => {
    const checkLogin = () => {
      if (localStorage.getItem("undefined_wallet_auth_key") === null) {
        window.location.replace("http://localhost:1234/");
      }
    };
    checkLogin();
  });

  return (
    <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Candidiate 1 Name / Party Name / Org. Name</Form.Label>
          <Form.Control
            required
            ref={candidateName1}
            placeholder="Enter Candidate Name / Party Name / Org. Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidate 1 Symbol URL</Form.Label>
          <Form.Control
            required
            ref={candidateName1URL}
            placeholder="Enter URL"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidiate 2 Name / Party Name / Org. Name</Form.Label>
          <Form.Control
            required
            ref={candidateName2}
            placeholder="Enter Candidate Name / Party Name / Org. Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidate 2 Symbol URL</Form.Label>
          <Form.Control
            required
            ref={candidateName2URL}
            placeholder="Enter URL"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidiate 3 Name / Party Name / Org. Name</Form.Label>
          <Form.Control
            required
            ref={candidateName3}
            placeholder="Enter Candidate Name / Party Name / Org. Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidate 3 Symbol URL</Form.Label>
          <Form.Control
            required
            ref={candidateName3URL}
            placeholder="Enter URL"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidiate 4 Name / Party Name / Org. Name</Form.Label>
          <Form.Control
            required
            ref={candidateName4}
            placeholder="Enter Candidate Name / Party Name / Org. Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidate 4 Symbol URL</Form.Label>
          <Form.Control
            required
            ref={candidateName4URL}
            placeholder="Enter URL"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prompt / Purpose of Poll</Form.Label>
          <Form.Control
            required
            ref={promptRef}
            placeholder="Add Purpose / Goal"
          ></Form.Control>
        </Form.Group>
      </Form>

      <Button
        type="submit"
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant="primary"
      >
        Create Poll
      </Button>
    </Container>
  );
};

export default NewPoll;
