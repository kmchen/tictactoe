import React from "react";
import { connect } from "react-redux";
import { store } from "../store";
import "../stylesheets/main.scss";

export function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
      );
}

export class Board extends React.Component {
  renderSquare(i) {
    const stats = store.getState();
    const {moves: {status}} = stats;
    return (
        <Square
          value={status[i]}
          onClick={() => this.props.onClick(i)}
        />
        );
  }
  render() {
    return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        );
  }
}
// App component
export class App extends React.Component {
  constructor() {
    super();
    // player 0 => "O", player 1 => "X"
    this.state = { player: 0, winning: null, winner: null };
  }

  handleClick(i) {
    const thisMove = this.state.player ? "X" : "O";
    this.props.dispatch({ type: 'MAKE_MOVE', payload: {position: i, result: thisMove}})
    this.setState({
      player: !this.state.player
    }, this.isWinning());
  }

  isWinning() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
      const stats = store.getState();
      const {moves: {status}} = stats;
      lines.forEach((val, key) => {
        const [val1, val2, val3] = val;
        if( status[val1] && status[val2] && status[val3] && 
            status[val1] === status[val2] && status[val1] === status[val3]) {
          this.setState({winning: true, winner: status[val1]});
          return;
        } 
      })
  }

  render() {
    return (
        <div>
            <div className="game">
                <div style={{paddingRight: '10px'}} className="game-board">
                    <Board onClick={i => this.handleClick(i)} />
                </div>
                <div>
                    <div> Player 0 : O</div>
                    <div> Player 1 : X</div>
                </div>
            </div>
            <p/>
            <div>Winner: {this.state.winner}</div>
        </div>
        );
  }
}

// export the connected class
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
