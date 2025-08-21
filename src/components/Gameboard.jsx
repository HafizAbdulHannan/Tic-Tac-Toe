


export default function GameBoard({ onActivePlayer, board}) {
    
    // const [gameboard,setgameboard] = useState(initialGameboard)

    // function handleSquare(rowindex,colindex) {
    //     setgameboard((prevgameboard)=>{
    //         const updatedgameboard = [...prevgameboard.map( innerarray =>[...innerarray] )]
    //         updatedgameboard[rowindex][colindex] = activePlayerSymbol
    //         return updatedgameboard
    //     })
    //     onActivePlayer()
    // }
    return(
        <ol id="game-board">
            {board.map((row,rowindex)=> <li key ={rowindex}>
                <ol>
                    {row.map((playersymbol,colindex)=> <li key={colindex}>
                        <button onClick={()=> onActivePlayer(rowindex,colindex)} disabled={playersymbol!=null}>{playersymbol}</button>
                    </li>)}
                </ol>
            </li> )}
        </ol>
    );
}