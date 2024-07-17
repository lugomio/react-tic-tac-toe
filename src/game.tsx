import { useState } from "react"
import { Board } from "./components/board"

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentBoard = history[currentMove]

  function handlePlay(newBoard: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), newBoard]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move: number) {
    setCurrentMove(move)
  }

  return (
    <main className="max-w-xs min-h-screen mx-auto flex flex-col gap-8 justify-center items-center">
      <h1 className="text-center text-4xl font-bold text-zinc-100"><span className="text-blue-600 block mb-2">React</span> Tic Tac Toe</h1>

      <Board
        xIsNext={xIsNext}
        onPlay={handlePlay}
        board={currentBoard}
      />

      {history.length > 1 && (
        <ol className="flex flex-wrap gap-3 justify-center items-center">
          {history.map((_, move) => {
            return (
              <li key={move}>
                <button
                  onClick={() => jumpTo(move)}
                  className="text-zinc-300 bg-zinc-700 leading-none px-2 py-1 rounded-md hover:bg-zinc-500"
                >
                  <span>Move #{move}</span>
                </button>
              </li>
            )
          })}
        </ol>
      )}
    </main>
  )
}
