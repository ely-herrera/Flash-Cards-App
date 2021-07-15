import { readDeck, updateDeck } from '../../utils/api';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

//Change selected deck name and description
function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: '', description: '' });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleChange = ({ target: { name, value } }) => {
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // If the user clicks "submit", the user is taken to the Deck screen.
  function clickSubmit(deck) {
    updateDeck(deck).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    // event.stopPropagation();
    clickSubmit(deck);
  }

  // It displays the same form as the Create Deck screen, except it is pre-filled with information for the existing deck.
  return (
    <>
      {/*There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* The name field is an <input> field of type text. */}
          <label htmlFor="name" className="form-group">
            Deck Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={deck.name}
            placeholder="Name your deck"
            className="form-control"
            width=" 100%"
          />

          <p></p>
          <label className="form-group">Description</label>
          {/* The description field is a <textarea> field that can be multiple lines of text. */}
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={deck.description}
            placeholder="1-2 sentences describing content of your deck"
            class="form-control"
          ></textarea>

          <p></p>
          {/*  If the user clicks "cancel", the user is taken to the Home screen. */}
          <button
            className="btn btn-secondary mr-2"
            onClick={() => history.push('/')}
          >
            Cancel
          </button>
          {/* If the user clicks "submit" the user is taken to the "/decks/:deckId" screen */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default EditDeck;
