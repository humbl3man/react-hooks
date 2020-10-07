// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useEffect, useState} from 'react'

function resetSquareState() {
  return Array(9).fill(null)
}

function useLocalStorage({
  key,
  defaultValue = '',
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) {
  const [state, setState] = useState(() => {
    const stateFromLocalStorage = window.localStorage.getItem(key)

    if (stateFromLocalStorage) {
      return deserialize(stateFromLocalStorage)
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, serialize(state))
    } catch (ex) {
      window.localStorage.removeItem(key)
    }
  }, [state, key, serialize])

  return [state, setState]
}

function Board() {
  const [squares, setSquares] = useLocalStorage({
    key: 'squares',
    defaultValue: resetSquareState,
  })
  const [nextValue, setNextValue] = useLocalStorage({
    key: 'nextValue',
    defaultValue: 'X',
  })
  const [winner, setWinner] = useLocalStorage({
    key: 'winner',
    defaultValue: null,
  })
  const [status, setStatus] = useLocalStorage({
    key: 'status',
    defaultValue: null,
  })

  function selectSquare(squareIndex) {
    if (winner || squares[squareIndex] !== null) {
      return
    }

    const squaresCopy = [...squares]
    const nextValueCopy = nextValue
    squaresCopy[squareIndex] = nextValueCopy
    setSquares(squaresCopy)
    setNextValue(calculateNextValue(squaresCopy))
    setWinner(calculateWinner(squaresCopy))
    setStatus(
      calculateStatus(
        calculateWinner(squaresCopy),
        squaresCopy,
        calculateNextValue(squaresCopy),
      ),
    )
  }

  function restart() {
    setSquares(resetSquareState)
    setWinner(null)
    setStatus(null)
    setNextValue('X')
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
