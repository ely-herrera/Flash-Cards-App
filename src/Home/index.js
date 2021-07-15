import React, { useEffect, useState } from 'react';
import { listDecks } from '../utils/api';
import { Link } from 'react-router-dom';
import DeckInfo from '../Layout/Decks/DeckInfo';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const deckData = await listDecks();
      setDecks(deckData);
    }
    loadDeck();
  }, []);

  return (
    <>
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        <span className="oi oi-plus mr-2" />
        Create New Deck
      </Link>
      <ul className="list-group">
        {decks.map((deck) => (
          <DeckInfo key={deck.id} deck={deck} setDecks={setDecks} />
        ))}
      </ul>
    </>
  );
}

export default Home;
