import React from "react";
import PropTypes from "prop-types";
import "./css.css";

function BoardWrapper(props) {
  return <div className="Board-wrapper">{props.children}</div>;
}

BoardWrapper.propTypes = {
  children: PropTypes.node,
};

export default BoardWrapper;
