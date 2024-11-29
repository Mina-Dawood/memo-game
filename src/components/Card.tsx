import React from "react";
import { CardType } from "../types/CardType";

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
      onClick={onClick}
    >
      {card.isFlipped || card.isMatched ? (
        <img className="front-img" src={card.value} alt="Coptic Letter" />
      ) : (
        <img src="/logo.jpeg" alt="Back" />
      )}
    </div>
  );
};

export default Card;
