import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <div className="footer" style={{background: "#3AAFA9", paddingTop: "10px", color: "white"}}>
        <div className="container" >
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                    <li><Link style={{textDecoration: 'none', color: 'white'}} to='/'>Home</Link></li>
                        <li><Link style={{textDecoration: 'none', color: 'white'}} to='/About'>About Us</Link></li>
                        <li><Link style={{textDecoration: 'none', color: 'white'}} to='/Contact'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
                        Coalesce Forum
		              <br />
		              <i className="fa fa-phone fa-lg"></i>: <br />
		              <i className="fa fa-fax fa-lg"></i>: <br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="message@coalesceforum.com" style={{textDecoration: 'none', color: 'white'}}>
                         message@coalesceforum.com</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google m-1" href="http://google.com/+"><i className="fa faGooglePlus"></i></a>
                        <a className="btn btn-social-icon btn-facebook m-1" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin m-1" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter m-1" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google m-1" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon m-1" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright Coalesce Forum</p>
                </div>
            </div>
        </div>
    </div>
    )
};

export default Footer;