import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const About = () => {
  return (
    <div className="container" style={{ minHeight: "60vh", marginTop: "3rem" }}>
      <div className="row">
        <div className="col-12">
          <h3>About Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12 col-md-6">
          <h2>Our Introduction</h2>
          <p style={{ textAlign: "justify" }}>
            Hello dear users, ours is a team of three passionate developers that
            aims to provide a voting experience by using the blockchain
            technology and integrating a discussion forum where a user can
            comment on their candidates and ask queries. The voting Dapp uses
            NEAR blockchain to make polls and execute the polling process.{" "}
          </p>
          <p style={{ textAlign: "justify" }}>
            Hope you enjoy the experience. Thankyou!
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <Card.Header
              className="text-white"
              style={{ background: "#3AAFA9" }}
            >
              Facts At a Glance
            </Card.Header>
            <Card.Body>
              <dl className="row p-1">
                <dt className="col-6">Started</dt>
                <dd className="col-6">2021</dd>
                <dt className="col-6">Major Stake Holder</dt>
                <dd className="col-6">H3 Students @ABES</dd>
                <dt className="col-6">Employees</dt>
                <dd className="col-6">3</dd>
              </dl>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
