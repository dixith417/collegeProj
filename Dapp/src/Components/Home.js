import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, Container, Button, Card } from "react-bootstrap";
import Dashboard from "./Dashboard";

const Home = (props) => {
  const [promptList, setPromptList] = useState([]);

  const deleteAllPolls = async () => {
    if (!checkLogin()) {
      alert("User not logged in, please login first!");
      return;
    }
    await window.contract.clearPromptArray();
    setPromptList([]);
  };

  const checkLogin = () => {
    if (localStorage.getItem("undefined_wallet_auth_key") === null) {
      // window.location.replace("http://localhost:1234/");
      return false;
    }
    return true;
  };

  // Getting the list of polls
  useEffect(() => {
    const getPrompts = async () => {
      setPromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
    <>
    <Dashboard />
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Poll Name</th>
            <th>Go to Poll</th>
            <th>
              <Button onClick={deleteAllPolls}>Delete Poll</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
                <td colSpan={2}>
                  {" "}
                  <Button
                    onClick={() => {
                      if (!checkLogin()) {
                        alert("User not logged in, please login first!");
                        return;
                      }
                      props.changeCandidates(item);
                    }}
                  >
                    Go to Poll
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default Home;
