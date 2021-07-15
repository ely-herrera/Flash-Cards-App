import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck } from '../utils/api';
import FlipCard from './FlipCard';
import StudyView from './StudyView';

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: 'Loading...', cards: [] });
  const [cardNumber, setCardNumber] = useState(1);

  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const cardCount = deck.cards.length;

  const nextHandler = () => {
    if (cardNumber === cardCount) {
      const returnToHomePage = !window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      return returnToHomePage ? history.push('/') : setCardNumber(1);
    }
    setCardNumber((prevState) => Math.min(cardCount, prevState + 1));
  };

  const cardTitle = `Card ${cardNumber} of ${cardCount}`;

  const card = deck.cards[cardNumber - 1];

  if (cardCount <= 2) {
    return (
      <StudyView name={deck.name} deckId={deckId}>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cardCount} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus" /> Add Cards
        </Link>
      </StudyView>
    );
  }

  return (
    <StudyView name={deck.name} deckId={deckId}>
      <FlipCard card={card} title={cardTitle}>
        <button type="button" className="btn btn-primary" onClick={nextHandler}>
          Next
        </button>
      </FlipCard>
    </StudyView>
  );
}

export default Study;
