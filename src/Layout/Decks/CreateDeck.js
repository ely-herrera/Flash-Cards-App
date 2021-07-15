import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';

// The path to this screen should be /decks/news
function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: '',
    description: '',
  };

  const [deck, setDeck] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) => {
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // If the user clicks "submit", the user is taken to the Deck screen.
  function clickSubmit(decks) {
    createDeck(decks).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    // event.stopPropagation();
    clickSubmit(deck);
  }

  return (
    <>
      {/*There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck). */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1> Create a New Deck </h1>
      {/* A form is shown with the appropriate fields for creating a new deck. */}
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateDeck;
