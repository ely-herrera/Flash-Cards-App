import React, { useEffect, useState } from 'react';
import { readDeck, deleteCard, deleteDeck } from '../../utils/api';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ListCards from '../Cards/ListCards';

// import CardList from "../../Card/List";

// The screen includes the deck name (e.g., "React Router") and deck description

// | "Edit"         | Edit Deck Screen |
// Each card in the deck:
// is listed on the page under the "Cards" heading.
// shows a question and the answer to the question.
// has an “Edit” button that takes the user to the Edit Card screen when clicked.

// You can use window.confirm() to create the modal dialog shown in the screenshot below.

function Deck() {
  // The path to this screen should include the deckId (i.e., /decks/:deckId).
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  const history = useHistory();

  useEffect(loadDeck, [deckId]);

  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  function handleDelete() {
    const confirmed = window.confirm(
      'Deleted data cannot be recovered, do you want to continue?'
    );

    if (confirmed) {
      deleteDeck(deck.id).then(() => history.push('/decks/new'));
    }
  }

  function deleteOneCard(cardId) {
    const confirmed = window.confirm(
      'Deleted cards cannot be recovered, do you want to continue?'
    );
    if (confirmed) {
      deleteCard(cardId).then(loadDeck);
    }
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="media mb-2">
        <div className="media-body">
          <h5 className="mt-0">{deck.name}</h5>
          {deck.description}
        </div>
      </div>
      {/*The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons.  */}
      <Link to={`/decks/${deck.id}/edit`}>
        <button className="btn btn-secondary mr-2">Edit</button>
      </Link>
      <Link to={`/decks/${deck.id}/study`}>
        <button className="btn btn-primary mr-2">Study</button>
      </Link>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button className="btn btn-primary mr-2">Add Cards</button>
      </Link>
      <button onClick={handleDelete} className="btn btn-danger float-right">
        Delete
      </button>
      <ListCards deck={deck} deleteOneCard={deleteOneCard} />
    </>
  );
}

export default Deck;
