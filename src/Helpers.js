import React from 'react'

const Helpers = (wordLen,wordCount) => {
  const characters = "asdfghjkl";
  let wordLength = wordLen;
  let numOfWords = wordCount;
  let randomWordsList = [];
  for(let i=0;i<numOfWords;i++){
    let randomWord = "";
    for(let j=0;j<wordLength;j++){
      let randomNum = Math.floor(Math.random()*characters.length);
      randomWord+=characters.substring(randomNum,randomNum+1)
    }
    randomWordsList[i]=randomWord;
  }
  return randomWordsList;
}
export {Helpers}