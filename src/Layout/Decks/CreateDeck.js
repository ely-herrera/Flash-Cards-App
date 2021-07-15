import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';

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

  function clickSubmit(decks) {
    createDeck(decks).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    clickSubmit(deck);
  }

  return (
    <>
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
