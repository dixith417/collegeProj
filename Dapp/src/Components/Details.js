import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLen = (len) => (val) => !val || val.length <= len;
const minLen = (len) => (val) => val && val.length >= len;

const CommentForm = (props) => {
  const [author, setAuthor] = useState("");
  const [statement, setStatement] = useState("");
  const [newComment, setNewComment] =  useState({});

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Posted the comment !");
    const comment = {
      candidate_id: props.itemId,
      rating: "4.0",
      comment: statement,
      author: author
    };
    setNewComment(comment);
    props.addComment(comment);
    setAuthor("");
    setStatement("");
  };

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
    };
    fetch('http://localhost:8080/api/discuss/comment/addComment', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id));
  }, [newComment]);

  return (
    <>
      <h3>Add Comment</h3>
      <hr />
      <form>
        <div className="row form-group">
          <label htmlFor="author" md={12}>
            Your Name
          </label>
          <div className="col" md={12}>
            <input
              type="text"
              model=".author"
              className="form-control"
              name="author"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="First Name"
              validators={{ required, minLen: minLen(3), maxLen: maxLen(15) }}
            />
          </div>
        </div>
        <div className="row form-group">
          <label htmlFor="comment" md={12}>
            Comment
          </label>
          <div className="col" md={12}>
            <textarea
              model=".comment"
              className="form-control"
              name="comment"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              id="comment"
              rows="4"
              validators={{ required }}
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col" md={12}>
            <Button onClick={(e) => handleCommentSubmit(e)} color="primary">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

const RenderCandInfo = ({ item }) => {
  if (item != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <Card.Img width="100%" src={item.image} alt={item.name} />
          <Card.Body>
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const RenderComments = ({ comments, itemId }) => {
  const [displayComments, setDisplayComments] = useState(comments);

  console.log(comments);

  const addComment = (comment) => {
    setDisplayComments((displayComments) => [...displayComments, comment]);
  };

  const review = displayComments.map((comment) => {
    return (
      <div key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          --{comment.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}
        </p>
      </div>
    );
  });

  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">{review}</ul>
      <CommentForm itemId={itemId} addComment={addComment} />
    </div>
  );
};

const Detail = (props) => {
  // const [comments, setComments] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  // const [filteredComments, setFilteredComments] = useState([]);

  // const getAllComments = () => {
  //   fetch("http://localhost:8080/api/discuss/comment/getAllComments")
  //   .then(response => response.json())
  //   .then(json => {
  //     setComments(json);
  //     console.log(json);
  //     setFilteredComments(json.filter(
  //       (comment) => comment.candidate_id == props.item.id
  //     ));
  //     setLoaded(true);
  //   })
  // };

  // useEffect(() => {
  //   getAllComments();
  // }, []);

  if (props.item != null) {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <h3>{props.item.name}</h3>
            <hr />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <RenderCandInfo item={props.item} />
          <div style={{ width: "100%", marginLeft: "100px" }}>
            <div className="m-1">
              <h4>Manifesto</h4>
              <ul className="list-unstyled">
                <div>
                  <p>Declaration 1</p>
                  <p>Declaration 2</p>
                  <p>Declaration 3</p>
                  <p>Declaration 4</p>
                  <p>Declaration 5</p>
                </div>
              </ul>
            </div>
            <RenderComments
              comments={props.item.comment_list}
              itemId={props.item.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Detail;
