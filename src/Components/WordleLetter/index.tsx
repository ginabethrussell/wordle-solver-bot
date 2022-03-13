import React from 'react';
import styled from 'styled-components'

const Tile = styled.div`
  height: 55px;
  width: 100%;
  margin: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color: #ffffff;
  vertical-align: middle;
  box-sizing: border-box;
  user-select: none;
  flex: 1
`
interface Props {
  letter: string
  letterIdx: number
  wordIdx: number
  handleUpdateClue: any
  values: number[]
}

const WordleLetter = (props: Props) => {
  const { letter, letterIdx, wordIdx, values, handleUpdateClue } = props;
  const colors: string[] = ['#808384','#b49f3a','#538d4e'];
  let value = values[letterIdx];

  const handleClick = () => {
    if (value < 2) {
      value += 1;
    } else {
      value = 0;
    }
    handleUpdateClue(wordIdx, letterIdx, value);
  }

  return (
    <Tile
      style={{backgroundColor: colors[value]}}
      onClick={handleClick}
    >
      {letter}
    </Tile>
  )
}

export default WordleLetter;