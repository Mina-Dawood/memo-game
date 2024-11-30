import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { CardType } from "../types/CardType";
import { getCopticLetterName } from "../utils/getCopticLetterName";
import { speakLetter } from "../utils/speackLetter";
import { getCopticWord } from "../utils/getCopticWord";

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showName, setShowName] = useState(false);
  const [lastMatchedCard, setLastMatchedCard] = useState<CardType | null>(null);
  const [numberOfCards, setNumberOfCards] = useState<number>();

  const flipSound = new Audio("/sounds/flip.mp3");
  const matchSound = new Audio("/sounds/match.mp3");
  const wrongSound = new Audio("/sounds/wrong.mp3");
  const backgroundMusic = useRef(new Audio("/sounds/background.mp3"));

  useEffect(() => {
    if (gameStarted) {
      backgroundMusic.current.loop = true;
      backgroundMusic.current.play();

      setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, isFlipped: true })));
        flipSound.play();
      }, 1000);
      setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, isFlipped: false })));
        flipSound.play();
      }, 10000);
    } else {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
    }
  }, [gameStarted]);

  const getRandomDistinctIndexes = (count: number, max: number) => {
    const indexes: number[] = [];

    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);

      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }

    return indexes;
  };

  const initializeCards = () => {
    const count = numberOfCards || 32;
    const randomIndexes = getRandomDistinctIndexes(count, 32);

    const initialCards = Array.from({ length: count }, (_, i) => {
      const randomIndex = randomIndexes[i];

      return {
        id: randomIndex + 1, // Unique identifier for the card type
        instanceId: `card-${randomIndex + 1}-a`, // Unique identifier for the first instance
        value: `/coptic_alphabet/${randomIndex + 1}.svg`,
        isFlipped: false,
        isMatched: false,
        letterName: getCopticLetterName(randomIndex),
        word: getCopticWord(randomIndex),
      };
    });

    const duplicatedCards = initialCards.flatMap((card) => [
      { ...card, instanceId: `${card.instanceId}-1` }, // First instance
      { ...card, instanceId: `${card.instanceId}-2` }, // Second instance
    ]);

    const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setGameStarted(false);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleCardClick = (instanceId: string) => {
    if (
      isLocked ||
      flippedCards.length === 2 ||
      flippedCards.some((id) => id === instanceId)
    )
      return;

    // Play flip sound
    flipSound.play();

    setLastMatchedCard(null);

    const card = cards.find((card) => card.instanceId === instanceId)!;
    speakLetter(card.letterName);

    // Flip the clicked card
    const updatedCards = cards.map((card) =>
      card.instanceId === instanceId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, instanceId];
    setFlippedCards(newFlippedCards);

    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsLocked(true);

      const flippedCardInstances = newFlippedCards.map(
        (id) => updatedCards.find((card) => card.instanceId === id)!
      );

      const [firstCard, secondCard] = flippedCardInstances;

      if (firstCard.id === secondCard.id) {
        // Cards match
        matchSound.play();
        const updatedCards = cards.map((card) =>
          card.id === firstCard.id ? { ...card, isMatched: true } : card
        );
        setCards(updatedCards);
        setLastMatchedCard(firstCard);

        if (updatedCards.every((card) => card.isMatched)) {
          setTimeout(() => {
            setIsGameOver(true);
          }, 3000);
        }
      } else {
        // Cards don't match
        wrongSound.play();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              newFlippedCards.includes(card.instanceId)
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }
  };

  const startGame = () => {
    initializeCards();
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    initializeCards();
  };

  const flipCards = () => {
    setTimeout(() => {
      setCards(cards.map((card) => ({ ...card, isFlipped: true })));
      flipSound.play();
    }, 0);
    setTimeout(() => {
      setCards(cards.map((card) => ({ ...card, isFlipped: false })));
      flipSound.play();
    }, 2000);
  };

  return (
    <div>
      <div className="flip-me-btn">
        <button onClick={flipCards}>Help Me</button>
      </div>
      {/* top left styled text */}
      {lastMatchedCard && (
        <div className="last-matched-card">
          {!showName ? (
            <a
              onClick={() => setShowName(true)}
            >{`${lastMatchedCard.letterName} - ${lastMatchedCard.word.coptic}`}</a>
          ) : (
            <a>{`${lastMatchedCard.letterName} - ${lastMatchedCard.word.coptic} ${lastMatchedCard.word.pronunciation}`}</a>
          )}
        </div>
      )}
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={`${card.id}-${index}`}
            card={card}
            onClick={() => handleCardClick(card.instanceId)}
          />
        ))}
      </div>

      {/* popup for game over */}
      {isGameOver ||
        (!gameStarted && (
          <div className="popup" id="popup">
            <div className="popup-content">
              {isGameOver && (
                <>
                  <h2>Congratulations!</h2>
                  <p>You have completed the game.</p>
                  <button onClick={resetGame}>Play Again</button>
                </>
              )}

              {!gameStarted && (
                <>
                  <h2>Memory Game</h2>
                  <p>Click the button to start the game.</p>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => setNumberOfCards(+e.target.value / 2)}
                      placeholder="Enter the number of cards"
                    />
                  </div>
                  <button onClick={startGame}>Start Game</button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GameBoard;
