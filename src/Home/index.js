import React, { useState, useEffect } from 'react';
import { deleteDeck } from '../utils/api';
import { Link, useRouteMatch } from 'react-router-dom';

function Home({ decks }) {
  // async function handleDelete(id) {
  //   const msgConfirmation = window.confirm(
  //     'Are you sure you want to delete this deck? You will not be able to recover it'
  //   );

  //   if (msgConfirmation) {
  //     await deleteDeck(id);
  //     setDecks((deck) => deck.filter((decks) => decks.id !== id));
  //   }
  // }

  const deckList = decks.map(({ name, description, cards, id }) => (
    <section key={id} className="card ">
      <div className="card-body">
        <div className="row">
          <h5 className="card-title col-10">{name}</h5>
          <p className="col-2 ">{cards.length} cards</p>
        </div>
        <p className="card-text">{description}</p>
        <div className="row">
          <div className="col-10">
            <Link to={`decks/${id}`} className="btn btn-secondary">
              <span className="oi oi-eye" /> View
            </Link>
            <Link to={`decks/${id}/study`}>
              <button className="btn btn-primary mx-2">
                <span className="oi oi-book" /> Study
              </button>
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger mx-2 text"
              // onClick={() => handleDelete(id)}
            >
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>
      </div>
    </section>
  ));

  return (
    <main>
      <Link to="/decks/new" className="btn btn-secondary m-2 text">
        <span className="oi oi-plus m-1" />
        Create Deck
      </Link>
      {deckList}
    </main>
  );
}

export default Home;
