import { useState } from 'react'
import Player from './components/Player.jsx'
import GameBoard from './components/Gameboard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'
import { WINNING_COMBINATIONS } from './Winning_combinations.js'
import './App.css'

const PLAYER = {
   X: 'Player 1',
   O: 'Player 2'
}
const initialGameboard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

function Gameboard(Gameturn){
  let gameboard = [...initialGameboard.map(array=>[...array])]
  for (const turns of Gameturn) {
    const {square,player} = turns
    const {row, col} = square

    gameboard[row][col] = player
  }
  return gameboard
}

function activeDerivedPlayer(Gameturn){
  let currentPlayer = 'X'

      if(Gameturn.length > 0 && Gameturn[0].player ==='X'){
        currentPlayer ='O'
      }
      return currentPlayer
}

function DerivedWinner(gameboard,player){
  let winner
  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combinations[0].row][combinations[0].col]
    const secondSquareSymbol = gameboard[combinations[1].row][combinations[1].col]
    const thirdSquareSymbol = gameboard[combinations[2].row][combinations[2].col]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol]
    }

  }
  return winner
}

function App() {
  const [player, setplayer] = useState(PLAYER)
  const [Gameturn,setGameturn] = useState([])
  const activeplayer = activeDerivedPlayer(Gameturn)

  const gameboard = Gameboard(Gameturn)

  const winner = DerivedWinner(gameboard,player)
  const hasDraw = Gameturn.length === 9 && !winner
  function handleActiveplayer(rowindex,colindex) {
    //setactiveplayer((currentActiveplayer)=> currentActiveplayer === 'X'? 'O': 'X')
    setGameturn((prevturn)=>{
      const currentPlayer = activeDerivedPlayer(prevturn)
      const updatedTurn = [
        { square: {row: rowindex, col: colindex }, player: currentPlayer },
        ...prevturn
      ]
      return updatedTurn
    })
  }

  function handleRematch() {
    setGameturn([])
  }

  function handlePlayerNameChange(symbol,newName) {
    setplayer(prevplayer =>{
      return{
        ...prevplayer,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id ="game-container">
        <ol id='players' className='highlight-player'>
          <Player name={PLAYER.X} symbol="X" isActive={activeplayer==='X'} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYER.O} symbol="O" isActive={activeplayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
          {(winner||hasDraw)  && (<GameOver winner={winner} onRestart={handleRematch}/>)}
        <GameBoard onActivePlayer={handleActiveplayer} board ={gameboard}/>
      </div>
      <Log turn={Gameturn}/>
    </main>
  )
}

export default App
