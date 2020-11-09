import React from "react";
import PropTypes from "prop-types";
import "./css.css";

function Tile(props) {
  const clickable = props.figure === "-";
  const figure = clickable ? props.playCard : props.figure;
  const click = (e) => {
    e.preventDefault();
    if (clickable) {
      props.placeMove(props.tileKey);
    }
  };
  return (
    <div onClick={click} className={clickable ? "Tile Tile-clickable" : "Tile"}>
      {figure}
    </div>
  );
}

Tile.propTypes = {
  figure: PropTypes.string,
  placeMove: PropTypes.func,
  tileKey: PropTypes.number,
  playCard: PropTypes.string,
};

export default Tile;
