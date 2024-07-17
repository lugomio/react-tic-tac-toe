interface SquareProps {
  value: string | null,
  onSquareClick: () => void,
  winnerSquares: (number | null)[],
  squareIndex: number
}

export function Square({ value, onSquareClick, winnerSquares, squareIndex }: SquareProps) {
  const isWinnerSquare = winnerSquares.includes(squareIndex)

  return (
    <>
      {isWinnerSquare ? (
        <button
          onClick={onSquareClick}
          className="bg-lime-900 text-5xl font-bold size-16 rounded-md text-center"
        >
          {value === 'X' ? (
            <span className="text-emerald-500">{value}</span>
          ) : (
            <span className="text-rose-500">{value}</span>
          )}
        </button >
      ) : (
        <button
          onClick={onSquareClick}
          className="bg-zinc-600 text-5xl font-bold size-16 rounded-md text-center"
        >
          {value === 'X' ? (
            <span className="text-emerald-500">{value}</span>
          ) : (
            <span className="text-rose-500">{value}</span>
          )}
        </button >
      )}
    </>
  )
}