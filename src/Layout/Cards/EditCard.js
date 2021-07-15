import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';

//Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
// There is a breadcrumb nav bar with a link to home /, then name of the deck of the card,and finally the text Edit Card :cardId
// It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.
// If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.

function EditCard() {
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({ front: '', back: '' });
  const [deck, setDeck] = useState({ cards: [] });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  const handleChange = ({ target: { name, value } }) => {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function submitButton(card) {
    updateCard(card).then(history.push(`/decks/${deck.id}`));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    submitButton({ ...card });
    setCard({ front: '', back: '' });
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card{cardId}
          </li>
        </ol>
      </nav>
      <h1> Edit Card </h1>
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

export default EditCard;
