import { useEffect, useState } from "react";
import { Square } from "./square";

interface BoardProps {
  xIsNext: boolean,
  onPlay: (newBoard: (string | null)[]) => void,
  board: (string | null)[]
}

export function Board({ xIsNext, onPlay, board }: BoardProps) {
  const boardSchema = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]

  const [winnerSquares, setWinnerSquares] = useState<(number | null)[]>([null])
  const [winner, setWinner] = useState<string | null>(null)

  function onSquareClick(i: number) {
    if (board[i] || winner) return

    const newBoard = board.slice()
    newBoard[i] = xIsNext ? 'X' : 'O'

    onPlay(newBoard)
  }

  useEffect(() => {
    function hasWinner() {
      const winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]

      for (const [a, b, c] of winCases) {
        if (
          board[a] === board[b] &&
          board[b] === board[c] &&
          board[a]
        ) {
          setWinnerSquares([a, b, c])
          return board[a]
        }
      }

      setWinnerSquares([null])

      if (!board.includes(null)) {
        return 'tie'
      }

      return null
    }

    const currentWinner = hasWinner()
    setWinner(currentWinner)
  }, [board])

  return (
    <>

      <div className="flex flex-col items-center justify-center gap-2">
        {boardSchema.map((line, index) => {
          return (
            <div key={index} className="flex items-center justify-center gap-2">
              {line.map(squareIndex => (
                <Square
                  key={squareIndex}
                  onSquareClick={() => onSquareClick(squareIndex)}
                  value={board[squareIndex]}
                  squareIndex={squareIndex}
                  winnerSquares={winnerSquares}
                />
              ))}
            </div>
          )
        })}
      </div>

      <p className="text-xl text-center text-zinc-100 font-bold">
        {winner ? (
          winner != 'tie' ? (
            <span>{winner} won! 🥳</span>
          ) : (
            <span>Tie! 😢</span>
          )
        ) : (
          <span>Current player: {xIsNext ? 'X' : 'O'}</span>
        )}
      </p>

    </>
  )
}