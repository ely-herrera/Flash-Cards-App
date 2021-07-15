import React, { useEffect, useState } from 'react';
import { listDecks } from '../utils/api';
//put listCards on the above
import { Link } from 'react-router-dom';
import DeckInfo from '../Layout/Decks/DeckInfo';

/**
 * Get decks, display all cards, and study a deck.
 */
function Home() {
  const [decks, setDecks] = useState([]);

  // For alternative to prop drilling - https://reactjs.org/docs/hooks-reference.html
  /**
   * PROP DRILLING EXAMPLE:
   Parent - 
    Child - ParentData (unused)
      Child - GrandParentData (used)
  **/

  useEffect(() => {
    async function loadDeck() {
      const deckData = await listDecks();
      // const cardData = await listCards(1);
      setDecks(deckData);
      // setCards(cardData);
    }
    loadDeck();
  }, []);

  return (
    <>
      {/* A "Create Deck" Link is shown and clicking it brings the user to the Create Deck screen. */}
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        <span className="oi oi-plus mr-2" />
        Create New Deck
      </Link>
      <ul className="list-group">
        {decks.map((deck) => (
          // The path to this screen should include the deckId (i.e., /decks/:deckId).
          <DeckInfo key={deck.id} deck={deck} setDecks={setDecks} />
        ))}
      </ul>
    </>
  );
}

export default Home;
