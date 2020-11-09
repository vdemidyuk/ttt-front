import React from "react";
import PropTypes from "prop-types";
import Tile from "../Tile";

function Tiles(props) {
  return (
    <React.Fragment>
      {props.board.board.split("").map((figure, i) => {
        return (
          <Tile
            key={i}
            tileKey={i}
            placeMove={props.placeMove}
            figure={figure}
            playCard={props.board.playCard}
          />
        );
      })}
    </React.Fragment>
  );
}

Tiles.propTypes = {
  board: PropTypes.object,
  figure: PropTypes.string,
  placeMove: PropTypes.func,
  tileKey: PropTypes.number,
  playCard: PropTypes.string,
};

export default Tiles;
