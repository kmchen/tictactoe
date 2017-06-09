import React from "react";
import { connect } from "react-redux";
import { store } from "../store";
import "../stylesheets/main.scss";

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
      );
}

class Board extends React.Component {
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
    this.state = { player: 0, winner: null };
  }

  handleClick(i) {
    const thisMove = this.state.player ? "X" : "O";
    this.props.dispatch({ type: 'MAKE_MOVE', payload: {position: i, result: thisMove}})
    this.setState({
      player: !this.state.player
    }, this.isWinning());
  }

  componentDidUpdate() {
    if (this.state.winner) {
      console.log('We have got a winniner');
    }
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
          this.state.winner = true;
          return;
        } 
      })
  }

  render() {
    return (
        <div className="game">
            <div className="game-board">
                <Board onClick={i => this.handleClick(i)} />
            </div>
        </div>
        );
}
}

// export the connected class
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
