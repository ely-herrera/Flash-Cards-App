import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';

// The screen displays the "React Router: Add Card" deck title.

function AddCard() {
  // The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: '',
    back: '',
  };
  const [card, setCard] = useState(initialFormState);
  const [deck, setDeck] = useState({ cards: [] });

  // You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleChange = ({ target: { name, value } }) => {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function submitButton(card) {
    createCard(deckId, card);
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    submitButton({ ...card });
    setCard({ front: '', back: '' });
  }

  return (
    <>
      {/* // There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards
     are being added, and finally the text Add Card (e.g., Home/React Router/Add Card). */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name} :Add a Card</h1>
      {/* Form has "front" and "back" fields for a new card. Both fields use <textarea> tag that can accommodate multiple lines of text. */}
      <form onSubmit={submitHandler}>
        <label>Front</label>
        <textarea
          id="front"
          type="text"
          name="front"
          onChange={handleChange}
          value={card.front}
          placeholder="front side of card"
          class="form-control"
        ></textarea>
        <label>Back</label>
        <textarea
          id="back"
          type="text"
          name="back"
          onChange={handleChange}
          value={card.back}
          placeholder="back side of card"
          class="form-control"
        ></textarea>
        {/* If the user clicks "Done", the user is taken to the Deck screen. */}
        <button
          onClick={() => history.push(`/decks/${deckId}`)}
          className="btn btn-secondary mr-2"
        >
          Done
        </button>
        {/* If the user clicks "Save", new card is created and put in relevant deck. Then the form is cleared and the process for adding a card is restarted. */}
        <button className="btn btn-primary">Save</button>
      </form>
    </>
  );
}

export default AddCard;
