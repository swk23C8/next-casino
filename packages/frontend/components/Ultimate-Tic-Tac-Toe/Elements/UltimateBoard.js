import React, {useState} from 'react';
import Board from './Board.js';
import './UltimateBoard.css';
import {Link, useParams} from "react-router-dom";

function UltimateBoard() {

    // boards: [enabled | disabled | tie |  X  |  O ]
    const [boards, setBoards] = useState(Array(9).fill("enabled"));
    const [isXNext, setNext] = useState(true);
    const [steps, setSteps] = useState(0);
    const [winner, setWinner] = useState("");
    const {xName, oName} = useParams();

function renderBoard(boardId) {
        return (
            <Board
                boardId = {boardId}
                boards = {boards}
                board = {boards[boardId]}
                setNextPlayer = {setNextPlayer}
                getPlayer = {getPlayer}
                incSteps = {incSteps}
                isEnabled = {(i) => isEnabled(i)}
                handleBoardTie = {(nextBoardId) => {handleBoardTie(boardId, nextBoardId)}}
                handleBoardWin = {(boardWinner, nextBoardId) => {handleBoardWin(boardId, boardWinner, nextBoardId)}}
                enableBoards = {(newBoards, nextBoard) => enableBoards(newBoards, nextBoard)}
            />
        );
    }

    function incSteps() {
        let currSteps = steps;
        setSteps(++currSteps);
    }

    function getPlayer() {
        return isXNext;
    }

    function setNextPlayer() {
        setNext(!isXNext);
    }

    function handleBoardTie(boardId, nextBoardId) {
        const newBoards = boards.slice();
        newBoards[boardId] = 'tie';
        setBoards(newBoards);
        enableBoards(newBoards, nextBoardId)
    }

    function handleBoardWin(boardId, boardWinner, nextBoardId) {
        const newBoards = boards.slice();
        newBoards[boardId] = boardWinner;
        setBoards(newBoards);
        enableBoards(newBoards, nextBoardId)
        checkWinner(newBoards);
    }

    function checkWinner(Boards) {
        const winBoards = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winBoards.length; i++) {
            const a = winBoards[i][0];
            const b = winBoards[i][1];
            const c = winBoards[i][2];
            if ((Boards[a] === 'X' || Boards[a] === 'O')
                && Boards[a] === Boards[b] && Boards[b] === Boards[c]) {
                    const winnerName = Boards[a]==='X'? xName : oName;
                    setWinner("Congrats " +winnerName +", You Won!!!");
                    saveInLeaderboard(winnerName);
                    for(let i=0; i<Boards.length; i++) {
                         if (Boards[i] === "enabled")
                             Boards[i] = "disabled";
                         setBoards(Boards);
                     }
            }
        }
    }

    function isEnabled (i) {
        return boards[i] === "enabled";
    }

    function enableBoards (Boards, nextBoardId) {
        if(Boards[nextBoardId] === "enabled" || Boards[nextBoardId] === "disabled"){
            for(let i = 0; i<Boards.length; i++) {
                if(Boards[i] === "enabled")
                    Boards[i] = "disabled";
            }
            Boards[nextBoardId] = "enabled";
        }
        if(Boards[nextBoardId] === "X" || Boards[nextBoardId] === "O" || Boards[nextBoardId] === "tie") {
            for(let i = 0; i<Boards.length; i++) {
                if(Boards[i] === "disabled")
                    Boards[i] = "enabled";
            }
        }
        setBoards(Boards);
    }

    function saveInLeaderboard (winnerName) {
        localStorage.setItem(winnerName, JSON.stringify(steps));
    }

    return (
        <div>
            <table className="bar">
                <Link className="links" to="/"><td>New Game</td></Link>
                <td className="player"><font color={isXNext? "crimson" : "cornflowerblue"}>
                    {isXNext? "X: " : "O: "} {isXNext? xName : oName}</font></td>
                <td><font color={isXNext? "crimson" : "cornflowerblue"}>{steps} Steps</font></td>
                <Link className="links" to={"/leaderboard/" +xName +"/" +oName}><td> Leaderboard </td></Link>
            </table>
        <div className="ultimate-grid">
            <div className = "board" id="0"> {renderBoard(0)} </div>
            <div className = "board" id="1"> {renderBoard(1)} </div>
            <div className = "board" id="2"> {renderBoard(2)} </div>
            <div className = "board" id="3"> {renderBoard(3)} </div>
            <div className = "board" id="4"> {renderBoard(4)} </div>
            <div className = "board" id="5"> {renderBoard(5)} </div>
            <div className = "board" id="6"> {renderBoard(6)} </div>
            <div className = "board" id="7"> {renderBoard(7)} </div>
            <div className = "board" id="8"> {renderBoard(8)} </div>
        </div>
            <div className="winner"><font color={!isXNext? "crimson" : "cornflowerblue"}>
                {winner === ''? '': winner} </font></div>
        </div>
    );
}

export default UltimateBoard;