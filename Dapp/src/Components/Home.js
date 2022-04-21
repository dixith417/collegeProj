import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  const deleteAllPolls = async () => {
    await window.contract.clearPromptArray();
    changePromptList([]);
  };

  // Getting the list of polls
  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
            <th>
              <Button onClick={deleteAllPolls}>Delete All Polls</Button>
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
                  <Button onClick={() => props.changeCandidates(item)}>
                    Go to Poll
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
