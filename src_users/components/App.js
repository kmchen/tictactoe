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
  renderSquare(row, col) {
    const stats = store.getState();
    const {moves: {status}} = stats;
    return (
        <Square
          key={row+col}
          value={status[row][col]}
          onClick={() => this.props.onClick(row, col)}
        />
        );
  }
  renderSquares() {
    const { grid } = this.props;
    let grids = [];
    grid.forEach((row, rowNum) => {
      let newRow = row.map((val, col) => {
          return this.renderSquare(rowNum, col);
      });
      grids.push(
          <div key={rowNum} className="board-row">
              { newRow } 
          </div>
        );
    });
    return grids
  }

  render() {
    return (
        <div>
            {this.renderSquares()}
        </div>
        );
  }
}

export class App extends React.Component {
  constructor() {
    super();
    this.addGrid = this.addGrid.bind(this);
    const { moves: { status }} = store.getState();
    // player 0 => "O", player 1 => "X"
    this.state = { player: 0, winner: null, grid: status };
  }

  addGrid() {
    const { moves: { status }} = store.getState();
    const cols = status[0].length;
    status.forEach((row, rowNum) => {
      row.push(null); 
    });
    status.push(Array(cols+1).fill(null))
    this.props.dispatch({ type: 'INCREASE_GRID', payload: {status: status}})
    this.setState({...this.state, grid: status});
  }

  handleClick(row, col) {
    const thisMove = this.state.player ? "X" : "O";
    this.props.dispatch({ type: 'MAKE_MOVE', payload: {col: col, row: row,  result: thisMove}})
    this.setState({
      ...this.state,
      player: !this.state.player
    });
    this.isWinning(row, col)
  }

  // getSlash returns all cells in slash direction
  getSlash(field, j, i) {
    let width = field[0].length;
    let height = field.length;
    var result = [];
    while (i > 0 && j + 1 < width) {
      i--;
      j++;
    }
    while (i < height && j >= 0) {
      result.push(field[i][j]);
      i++;
      j--;
    }
    return result;
  }

  // getBackSlash returns all cells in backslash direction
  getBackSlash(field, i, j) {
    let width = field[0].length;
    let height = field.length;
    let result = [];
    while (i > 0 && j > 0) {
      i--;
      j--;
    }
    while (i < height && j < width) {
      result.push(field[i][j]);
      i++;
      j++;
    } return result;
  }

  isWinning(row, col) {
    const { moves: { status }} = store.getState();
    let lines = [];
    lines.push(this.getSlash(status, row, col));
    lines.push(this.getBackSlash(status, row, col));
    lines.push(status[row]);
    const vertical = status.map((val, key) => {
        return val[col];
    });
    lines.push(vertical);
    const _that = this;
    lines.forEach((val, key) => {
        const numX = val.filter(x => x === "X");
        const numO = val.filter(x => x === "O");
        if(numX.length >= 5) {
             _that.setState({..._that.state, winner: "X"});
             return;
        }
        if(numO.length >= 5) {
            _that.setState({..._that.state, winner: "O"});
            return;
        }
    });
  }

  render() {
    return (
        <div>
            <div className="game">
                <div style={{paddingRight: 10}}className="game-board">
                    <Board onClick={(col, row) => this.handleClick(col, row)}  grid={this.state.grid}/>
                </div>
                <div>
                    <div> Player 0 : O</div>
                    <div> Player 1 : X</div>
                    <a style={{cursor: 'pointer'}}onClick={this.addGrid}>+ More Grids</a>
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
