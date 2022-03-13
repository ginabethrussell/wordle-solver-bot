class WordleSolver {
  constructor(words) {
    this._words = words
    this._remaining = [...words]
  }

  reset() {
    this._remaining = [...this._words]
  }

  applyHint(guess, hint) {
    this._remaining = this._remaining.filter(w => this._checkWordMatchesHint(w, guess, hint))
  }

  _checkWordMatchesHint(word, guess, hint) {
    return guess.split('').map((l,i) => {
      if (hint[i] === '0'){
        return word.search(l) === -1
      } else if (hint[i] === '1') {
        const loc = word.search(l)
        return loc !== -1 && loc !== i
      } else if (hint[i] === '2') {
        return word[i] === l
      }
    }).every(v => v)
  }

  getGuess() {
    if (this._remaining.length > 1){
      const guesses = this._getRankedGuesses(
        this._words,
        this._getExpectedFractionRemainingPerLetter(this._remaining)
      )
      return guesses[0]['guess']
    } else if (this._remaining === 0) {
      throw "No possible words remaining"
    } else {
      return this._remaining[0]
    }
  }

  _getRankedGuesses(validGuesses, expectedFractionRemaining) {
    const guesses = validGuesses.map( w => ({
      'guess': w,
      'value': this._getWordValue(w, expectedFractionRemaining),
      'unique': this._removeRepeatedLetters(w)
    }))
    guesses.sort((a,b) => b['value'] - a['value'])
    return guesses
  }

  _getWordValue(word, expectedFractionRemaining) {
    const withoutRepeated = this._removeRepeatedLetters(word)
    const numRepeated = word.length - withoutRepeated.length
    const value = -Math.sqrt(
      withoutRepeated
      .split('')
      .map(l => expectedFractionRemaining[l] ** 2)
      .reduce((a,v) => a + v)
    ) - numRepeated
    return value
  }

  _removeRepeatedLetters(word) {
    return word.split('')
    .reduce((w,l) => (w.search(l) !== -1) ? w : w + l, '')
  }

  _getExpectedFractionRemainingPerLetter(remaining) {
    const total = remaining.length
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const letterFrequency = {}
    letters.forEach( v => {letterFrequency[v] = 0.0})
    remaining.forEach( w => {
      w.split('').forEach(l => {
        letterFrequency[l] += 1 / total
      })
    })
    const expectedFractionRemaining = {}
    Object.keys(letterFrequency).forEach(k => {
      const v = letterFrequency[k]
      expectedFractionRemaining[k] = v * v + (1 - v) * (1 - v)
    })
    return expectedFractionRemaining
  }
}

export default WordleSolver;