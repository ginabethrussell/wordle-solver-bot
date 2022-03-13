import { useState, useEffect } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from 'styled-components';
import WordleGrid from './Components/WordleGrid';
import InfoDialog from './Components/InfoDialog';
import { createWordList } from './WordleSolver/helpers';

const Header = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 25px;
  border-bottom: 1px solid rgba(0,0,0,.15);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-family: 'Merriweather';
  font-weight: 700;
  font-size: 37px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-align: center;
  margin-right: 4px;
  pointer-events: none;
  user-select: none;
`

const MobileHeader = styled.div`
  width: 100%;
  height: 75px;
  margin-top: 25px;
  border-bottom: 1px solid rgba(0,0,0,.15);
  display: flex;
  justify-content: center;
  align-items: center;
`
const MobileTitle = styled.h1`
  font-family: 'Merriweather';
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-align: center;
  margin-right: 4px;
  pointer-events: none;
  user-select: none;
`

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');

  useEffect (() => {
    createWordList()
    .then((wordList) => {
      setWords(wordList)
    })
    .then(() => setLoading(false));
  },[])

  if(loading) return <div>Loading</div>;

  return (
    <div className="App">
      { matches ? (
        <Header>
          <Title>
            WORDLE SOLVER
          </Title>
          <IconButton onClick={() => setDialogOpen(true)} size='large'>
            <HelpOutlineRoundedIcon fontSize='large'/>
          </IconButton>
        </Header>
      ) : (
        <MobileHeader>
          <MobileTitle>
            WORDLE SOLVER
          </MobileTitle>
          <IconButton onClick={() => setDialogOpen(true)} size='medium'>
            <HelpOutlineRoundedIcon fontSize='medium'/>
          </IconButton>
        </MobileHeader>
      )}
      <WordleGrid  words={words}/>
      <InfoDialog open={dialogOpen} setOpen={setDialogOpen}/>
    </div>
  );
}

export default App;
