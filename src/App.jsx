import React, { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard'
import ScoreBoard from './components/ScoreBoard'
import { getAIMove } from './utils/aiOpenRouter'
import { checkWinner } from './utils/winner'
import { div } from 'motion/react-client'

const App = () => {

  const [board, setBoard] =useState(Array(9).fill(null))

  const[isPlayer, setIsPlayer] = useState(true)

  const [winner, setWinner] =useState(null)
  
  const [score, setScore] = useState({X:0, O:0})

  const handleClick = (i) =>{
    if(!isPlayer || board[i] || winner) return;

    const newBorad = [...board]
    newBorad[i]="X"
    setBoard(newBorad)
    setIsPlayer(false)
  }

  useEffect(()=> {

    if(winner) return

    const result = checkWinner(board);

      if(result?.winner){
        setWinner(result.winner)
        if(result?.winner === "X" || result.winner === "O"){
          setScore((prev) => ({
          ...prev,
          [result.winner]:prev[result.winner] + 1
        }))

        return
        
        }
      }
    
    if(!isPlayer && !winner ){

     const aiTurn = async ()=>{
      const move = await getAIMove(board);

      if(move !== null && board[move] === null){

        const newBorad = [...board]
        newBorad[move] ="O";
        setBoard(newBorad)
        setIsPlayer(true)
      }
     }
     
     const timeout = setTimeout(aiTurn, 600)
     return ()=> clearTimeout(timeout)
    }


  },[board,isPlayer,winner])


const restartGame = ()=>{

  setBoard(Array(9).fill(null))
  setIsPlayer(true)
  setWinner(null)

}

  return (
    <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center '>
      <h1 className='text-3xl font-bold mb-4'>Tic Tac TAI 🤖 </h1>
      
      <ScoreBoard score={score} />

      <GameBoard board={board} handleClick={handleClick}/>

      {winner && (
        <div className='mt-4 text-xl '>
        {winner === "Draw" ? "The game is Draw": `${winner} wins!`} 
        <button onClick={restartGame}
        className='ml-4 px-4 py-2 bg-[#38BDf8] text-black rounded hover:bg-[#0EA5E9] text-white '
        >
          play again!  
        </button> 
        </div>
      )}  

    </div>
  )
}

export default App
