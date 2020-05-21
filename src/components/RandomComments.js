import React, { useState, useEffect } from "react";

import { useGlobalSpinnerActionsContext } from "./../contexts/GlobalSpinnerContext";

import "./RandomComments.css";

const RandomComments = props => {
  const [comments, setComments] = useState([]);
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  useEffect(() => {
    (async () => {
      setGlobalSpinner(true);
      const result = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await result.json();
      setComments(data);
      setGlobalSpinner(false);
    })();
  }, [setGlobalSpinner]);

  return (
    <div>
      {comments.map(comment => {
        const { name, body, id } = comment;
        return (
          <div key={id} className="comment-box">
            <p className="comment-title">{name}</p>
            <p className="comment-text"> {body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RandomComments;
