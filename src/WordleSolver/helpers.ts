export const createWordList = async () => {
  return await fetch('./wordlist.txt')
  .then(wordlist => wordlist.text())
  .then(text => text.split("\n"));
}