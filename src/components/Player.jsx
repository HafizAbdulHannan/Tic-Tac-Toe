import { useState } from "react"


export default function Player({name, symbol, isActive, onChangeName}) {
    const[pname,setpname] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    
    function PlayerHandler() {
    
        setIsEditing(editing => !editing)
        if(isEditing) {
            onChangeName(symbol,pname)
        }
    }
    function handleChange(event) {
        setpname(event.target.value)
    }
    let PlayerName = <span className='player-name'>{pname}</span>
    if(isEditing){
        PlayerName = <input type ="text" required value={pname} onChange={handleChange}/>
    }
    
    return (
        <li className={isActive? 'active': undefined}>
            <span className='player'>
            {PlayerName}
            <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={PlayerHandler}>{isEditing? "Save":"Edit"}</button>
        </li>
    );
}
