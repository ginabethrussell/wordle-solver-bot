import {useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import WordleSolver from '../../WordleSolver/wordlesolver';
import WordleWord from '../WordleWord';
import styled from 'styled-components';

const Game = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`

const Board = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  width: 312px;
  height: 372px;
  border: 1px solid rgba(0,0,0,.15);;;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  margin-top: 25px;
  justify-content: space-around;
`
const MobileButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 50%;
  margin-top: 25px;
  margin-bottom: 25px;
  justify-content: space-around;
`

const GameOverMessage = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 25px;
`
interface Props {
  words: string[]
}
const initialClueArray = [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
]

const WordleGrid = ({ words }: Props) => {
  const [currentClue, setCurrentClue] = useState([0,0,0,0,0]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [wordGuesses, setWordGuesses] = useState(Array(6).fill('     '));
  const [clueArray, setClueArray] = useState(JSON.parse(JSON.stringify(initialClueArray)));
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState('');
  const matches = useMediaQuery('(min-width:600px)');

  const wordleSolver = useMemo(() => new WordleSolver(words), [words]);

  useEffect(() => {
    if (words) {
      const newGuessesList = Array(6).fill('     ');
      newGuessesList[0] = wordleSolver.getGuess();
      setWordGuesses(newGuessesList);
      setCurrentGuess(wordleSolver.getGuess());
    }
  }, [words, wordleSolver]);

  const handleUpdateClue = (wordIdx: number, letterIdx: number, value: number) => {
    if(wordIdx === currentIdx) {
      const newClueArray = [...clueArray];
      const newWordArray = newClueArray[wordIdx];
      newWordArray[letterIdx] = value;
      setClueArray(newClueArray);
      setCurrentClue(newClueArray[wordIdx]);
    }
  }

const handleSubmitHints = () => {
  if(currentClue.join('') === '22222') {
    setGameOver(true);
    return;
  }
  wordleSolver.applyHint(currentGuess, currentClue.join(''));
  setCurrentIdx(currentIdx + 1);
  setCurrentClue([0,0,0,0,0]);
  try {
    const nextGuess = wordleSolver.getGuess();
    console.log(nextGuess)
    if(!nextGuess) {
      setGameOver(true)
      setError("There are no valid words that match your hints.");
      return;
    } 
    setCurrentGuess(nextGuess);
    const updatedGuessesList = [...wordGuesses];
    const nextEmptyGuessIndex = updatedGuessesList.indexOf('     ');
    console.log(nextEmptyGuessIndex)
    if (nextEmptyGuessIndex === -1) {
      setGameOver(true)
      return;
    }
    updatedGuessesList[nextEmptyGuessIndex]= nextGuess;
    setWordGuesses(updatedGuessesList);
  } catch (err: any) {
    setError(err);
    setGameOver(true);
  }
}

const handleWin = () => {
  setCurrentClue([2,2,2,2,2]);
  setGameOver(true);
  const updatedClueArray = [...clueArray];
  const rowIdx = wordGuesses.indexOf(currentGuess);
  updatedClueArray[rowIdx] = [2,2,2,2,2];
  setClueArray(updatedClueArray);
}

const handleReset = () => {
  wordleSolver.reset();
  const firstGuess = wordleSolver.getGuess();
  setCurrentGuess(firstGuess);
  const newGuessesList = Array(6).fill('     ');
  newGuessesList[0] = firstGuess;
  setWordGuesses(newGuessesList);
  setCurrentClue([0,0,0,0,0]);
  setCurrentIdx(0);
  setGameOver(false);
  setError('');
  const resetClueArray = JSON.parse(JSON.stringify(initialClueArray));
  setClueArray(resetClueArray);
}

  return (
  <Game>
    <BoardContainer>
    <Paper elevation={3}>
    <Board>
      {wordGuesses.map((guess,idx) => (
        <WordleWord 
          key={`guess-${idx + 1}`}
          wordIdx={idx}
          word={guess}
          handleUpdateClue={handleUpdateClue}
          clueArray={clueArray}
        />
      ))}
    </Board>
    </Paper>
    {matches ? (
      <ButtonContainer>
        <Button 
          variant='contained' 
          color='primary'
          onClick={handleSubmitHints}
          disabled={gameOver}
        >
          Apply Hints
        </Button>
        <Button 
          variant='contained'
          color='success'
          onClick={handleWin}
          disabled={gameOver}
        >
          That's Correct!
        </Button>
        <Button 
          variant='contained' 
          color='warning'
          onClick={handleReset}
        >
          Reset Game
        </Button>
      </ButtonContainer>
    ): (
      <MobileButtonContainer>
        <Button 
          variant='contained' 
          color='primary'
          onClick={handleSubmitHints}
        >
          Apply Hints
        </Button>
        <Button 
          variant='contained'
          color='success'
          onClick={handleWin}
        >
          That's Correct!
        </Button>
        <Button 
          variant='contained' 
          color='warning'
          onClick={handleReset}
        >
          Reset Game
        </Button>
      </MobileButtonContainer>
    )}
    
      { 
        gameOver && currentClue.join('') === '22222' ? (
          <Alert onClose={handleReset} style={{position: 'absolute', top: 250, width: '250px'}} severity="success">I won ??? Thanks for the hints!</Alert>
        )
        :  gameOver && error ? (
          <Alert onClose={handleReset} style={{position: 'absolute', top: 250, width: '250px'}} severity="warning">Hey - I think you aren't giving me valid hints.</Alert>
        ) : gameOver ?  (
          <Alert onClose={handleReset} style={{position: 'absolute', top: 250, width: '250px'}} severity="error">Oh no! - I lost. Would I have gotten it with my next guess - { currentGuess }? Come back and let me try again tomorrow.</Alert>
        )
        : null
      }

    </BoardContainer>
    </Game>
  )
}

export default WordleGrid;