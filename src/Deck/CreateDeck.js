import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';
import DeckForm from './DeckForm';
function CreateDeck() {
  const initialFormState = {
    name: '',
    description: '',
  };
  const [formData, setFormData] = useState({ initialFormState });
  const changeHandler = ({ target }) => {
    const { value, name } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    let newDeck = [];
    async function updateDecks() {
      try {
        newDeck = await createDeck(formData);
        history.push(`/decks/${newDeck.id}`);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted!');
        } else throw error;
      }
    }
    updateDecks();
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" key="0">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="1">
            Create Deck
          </li>
        </ol>
      </nav>
      <br />
      <h2>Create Deck</h2>
      <form onSubmit={submitHandler}>
        <DeckForm formData={formData} changeHandler={changeHandler} />
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>{' '}
        &nbsp;
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default CreateDeck;
