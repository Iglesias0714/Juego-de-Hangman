import React, { useState, useEffect } from 'react';

interface HangmanProps {
  words: string[];
  hints: { [word: string]: string };
}

const Hangman = ({ words, hints }: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState<number>(0);

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
  }, [words]);

  useEffect(() => {
    if (selectedWord && hints[selectedWord] === undefined) {
      setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    }
  }, [selectedWord, hints, words]);

  const displayWord = selectedWord.split('').map((letter, index) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return '_';
    }
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
      }
    }
  };

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
  };

  return (
    <div>
      {selectedWord && (
        <>
          <p>{displayWord.join(' ')}</p>
          <p>Hint: {hints[selectedWord]}</p>
          <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
          {(displayWord.join('') === selectedWord || errorCount > 5) && (
            <button onClick={restartGame}>Select New Word</button>
          )}
          <p>Error count: {errorCount}</p>
          {displayWord.join('') === selectedWord && (
            <p>You won in this round</p>
          )}
        </>
      )}
    </div>
  );
};

export default Hangman;


