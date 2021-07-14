import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Deck from './Deck';
import { listDecks } from '../../utils/api/index';

function ListDeck() {
  const [decks, setDecks] = useState([]);
  function getDecks() {
    listDecks().then(setDecks);
  }

  useEffect(getDecks, []);

  const deckList = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

  return (
    <>
      <Link to="/decks/new" className="btn btn-secondary">
        <span className="oi oi-plus" /> Create Deck
      </Link>
      <div>{deckList}</div>
    </>
  );
}
export default ListDeck;
