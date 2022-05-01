import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const required = (val) => val && val.length
const maxLength = (len) => (val) => !val || val.length <= len
const minLength = (len) => (val) => val && val.length >= len
const isNumber = (val) => !isNaN(Number(val))
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

const Contact = (props) => {
  const handleSubmit = (values) => {
    console.log('Current State is: ' + JSON.stringify(values))
    alert('Current State is: ' + JSON.stringify(values))
    // this.props.resetFeedbackForm()
    // event.preventDefault();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            Organisation's Address
            <br />
            <i className="fa fa-phone fa-lg"></i>: <br />
            <i className="fa fa-fax fa-lg"></i>: <br />
            <i className="fa fa-envelope fa-lg"></i>:{' '}
            <a href="message@organisation.com">message@organisation.com</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send Us Your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <form
            model="feedback"
            onSubmit={(values) => handleSubmit(values)}
          >
            <div className="row form-group">
              <label htmlFor="firstname" md={2}>
                First Name
              </label>
              <div className="col" md={10}>
                <input type="text"
                  model=".firstname"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
              </div>
            </div>
            <div className="row form-group">
              <label htmlFor="lastname" md={2}>
                Last Name
              </label>
              <div className="col" md={10}>
                <input type="text"
                  model=".lastname"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
              </div>
            </div>
            <div className="row form-group">
              <label htmlFor="telnum" md={2}>
                Contact Tel.
              </label>
              <div className="col" md={10}>
                <input type="text"
                  model=".telnum"
                  id="telnum"
                  name="telnum"
                  placeholder="Tel. Number"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                    isNumber,
                  }}
                />
              </div>
            </div>
            <div className="row form-group">
              <label htmlFor="email" md={2}>
                Email
              </label>
              <div className="col" md={10}>
                <input type="text"
                  model=".email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  validators={{
                    required,
                    validEmail,
                  }}
                />
              </div>
            </div>
            <div className="row form-group">
              <label htmlFor="message" md={2}>
                Your Feedback
              </label>
              <div className="col" md={10}>
                <textarea
                  model=".message"
                  id="message"
                  name="message"
                  rows="12"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col" md={{ size: 10, offset: 2 }}>
                <button type="submit" color="primary">
                  Send Feedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;