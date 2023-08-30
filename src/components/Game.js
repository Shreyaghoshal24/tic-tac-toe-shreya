import React, { Component} from 'react'
import Board from './Board';
import './Game.css';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ],
            winningSquares: null
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
       
    } 
    handleRestart = () => {
        this.setState({
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            stepNumber: 0
        });
    };
  


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button className="game-button" onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
            )
        });
      
        if (winner) {
            status = 'Winner is ' + winner;
        } 
        else if (current.squares.every(square => square !== null)) {
          status = "Oops! Tie...😵‍💫";
        }
        else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        

        return (
          <>
            <div className="header">
              <span className="header-text">
                Let's play the tic-tac-toe Game!
              </span>
            </div>
            <div className="game">
              <div className="game-board">
                <Board
                  onClick={(i) => this.handleClick(i)}
                  squares={current.squares}
                />
              </div>
              <div className="game-info">
                <div className="game-status">
                  {status}
                  {winner && (
                    <span
                      className="emoji"
                      role="img"
                      aria-label="celebration-emoji"
                    >
                      🎉
                    </span>
                  )}
                </div>
                <ul>{moves}</ul>
              </div>
            </div>
            <button onClick={this.handleRestart} className="restart-button">
              <AutorenewIcon className="autorenew-icon"></AutorenewIcon>
            </button>
          </>
        );
    }
}

function calculateWinner(squares) {
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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}