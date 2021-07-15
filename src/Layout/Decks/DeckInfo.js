import { Link, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import Deck from './Deck';
import { deleteDeck } from '../../utils/api';
import React from 'react';

/**
 * To display deck information to allow notification of actions.
 */
function DeckInfo({ deck, deleteDck, setDeck }) {
  const history = useHistory();

  // TODO: RB - centralize all deck functionality to Home/index.js
  // Delete Card Prompt
  function handleDelete() {
    const confirmed = window.confirm(
      'Deleted data cannot be recovered, do you want to continue?'
    );

    if (confirmed) {
      deleteDeck(deck.id).then(() => history.push('/decks/new'));
    }
  }
  return (
    <>
      {/* There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router). */}
      <li className="list-group-item mb-4">
        <div className="mb-2 justify-content-between d-flex">
          <h3>{deck.name}</h3>
          <div className="float-right">{deck.cards.length} cards</div>
        </div>
        <div className="mb-2"> {deck.description}</div>
        <div>
          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary mr-1">View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary mr-1">Study</button>
          </Link>
          {/*  has a “Delete” button that allows that card to be deleted. */}
          <button onClick={handleDelete} className="btn btn-danger float-right">
            Delete
          </button>
        </div>
      </li>
      <Route exact path={`/decks/${deck.id}`}>
        <Deck deck={deck} setDeck={setDeck} />
      </Route>
    </>
  );
}

export default DeckInfo;
