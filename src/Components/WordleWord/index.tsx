import WordleLetter from '../WordleLetter';

interface Props {
  word: string,
  wordIdx: number,
  handleUpdateClue: any,
  clueArray: number[][],
}

const WordleWord = (props: Props) => {
  const { word, wordIdx, handleUpdateClue, clueArray }  = props;
  const letters = word.split('');

  return (
    <div style={{display:'flex',  width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
      {letters.map((letter, idx )=> (
        <WordleLetter 
          key={idx} 
          letter={letter.toUpperCase()}
          wordIdx={wordIdx}
          letterIdx={idx}
          handleUpdateClue={handleUpdateClue}
          values={clueArray[wordIdx]} />
      ))}
    </div>
  )
}

export default WordleWord;