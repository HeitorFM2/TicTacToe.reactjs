import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './JogoVelha.css';
import RotateInDownLeft from './RotateInDownLeft'

function App (){

  // Array que cria as celulas
  const emptyBoard = Array(9).fill("");

  // Array que seta o valor das celulas
  const [board, setBoard] = useState(emptyBoard);

  // Array que define o jogador
  const [currentPlayer, setCurrentPlayer] = useState("O");
  
  // Array dos winners
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    // Bloquear depois que alguem ganha
    if(winner) {
      Swal.fire(
        'O jogo já foi finalizado',
        '',
        'error'
      ) 
      return null
    };

    // Bloqueando a celula quando ja existir um valor
    if(board[index] !== "") {
      Swal.fire(
        'Célula já escolhida',
        '',
        'error'
      )
      return null
    };

    // Mapeando a celula que foi selecionada e colocando o seu valor
    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

    // Mudando de jogador
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkWinner = () => {
    // Possibilidades de ganhar
    const possibleWin = [
      // Horizontal
      [board[0],board[1],board[2]],
      [board[3],board[4],board[5]],
      [board[6],board[7],board[8]],

      // Vertical
      [board[0],board[3],board[6]],
      [board[1],board[4],board[7]],
      [board[2],board[5],board[8]],

      // Diagonal
      [board[0],board[4],board[8]],
      [board[2],board[4],board[6]],
    ];

    // every() um loop para verificar se for false ou true
    possibleWin.forEach(cells => {
      if(cells.every(cell => cell ==="O")) {     
        Swal.fire(
          'O jogador "O" ganhou!',
          'Parabéns!!',
          'sucess'
        )
      setWinner("O");
      }
      if(cells.every(cell => cell ==="X")){
        Swal.fire(
          'O jogador "X" ganhou!',
          'Parabéns!!',
          'sucess'
        )
        setWinner("X");
      } 
    });
  }

  // Verificando empate
  function checkDraw() {
    if(winner === null){
      if(board.every(item => item !== "")){
        Swal.fire(
          'Empatou!',
          '',
          'error'
        )
        setWinner("E");
      } 
    }
  }

  // useEffect = onLoad
  checkDraw();
  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }
    return(
      <div>
        <main>
        <RotateInDownLeft duration="0.8s" delay="0.2s">

            <h1 className='title'>Jogo da Velha</h1>
            <div className='jogadorVez'>Vez do jogador: {currentPlayer}</div>

        </RotateInDownLeft>


            <div className={`board ${winner ? "game-over" : ""}`}>
              {board.map((item, index) => (
                <div 
                  key={index} 
                  className={`cell ${item} ${winner ? "win" : ""}`}
                  onClick={() => handleCellClick(index)} 
                >
                  {item}
                </div>
              ))}
            </div>
            
            {/* Apenas quando tiver um vencedor, mostrar o footer */}
            {winner &&
              <footer>

                <div className='winner-button'>
                  <button className="cta" onClick={resetGame}>
                    <span>Recomeçar jogo!</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </div>
              </footer>
            }
        </main>
      </div>
    )
}

export default App;
