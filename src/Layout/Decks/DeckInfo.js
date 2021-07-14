import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import ListCard from '../Cards/ListCard';
import Study from '../../Study';
import DeckForm from './DeckForm';
import Deck from './Deck';
import CardForm from '../Cards/CardForm';
import { readDeck } from '../../utils/api/index';

function DeckInfo() {
  const [deck, setDeck] = useState({});
  const {
    params: { deckId },
    path,
    url,
  } = useRouteMatch();

  useEffect(getDeck, []);

  function getDeck() {
    readDeck(deckId).then(setDeck);
  }

  const editDeckForm = {
    title: 'Edit Deck',
    input: 'Name',
    description: 'Description',
    submitType: 'editDeck',
  };
  const newCardForm = {
    title: 'Add Card',
    input: 'Front',
    description: 'Back',
    submitType: 'newCard',
  };
  const editCardForm = {
    title: 'Edit Card',
    input: 'Front',
    description: 'Back',
    submitType: 'editCard',
  };

  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
          </nav>
          <Deck deck={deck} />
          <h2>Cards</h2>
          <ListCard deck={deck} />
        </Route>
        <Route path={`${path}/study`}>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`${url}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">Study</li>
            </ol>
          </nav>
          <Study />
        </Route>
        <Route path={`${path}/edit`}>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`${url}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
          </nav>
          <DeckForm formProps={editDeckForm} />
        </Route>
        <Route exact path={`${path}/cards/new`}>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`${url}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">Add Card</li>
            </ol>
          </nav>
          <CardForm formProps={newCardForm} deck={deck} />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`${url}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">Edit Card</li>
            </ol>
          </nav>
          <CardForm formProps={editCardForm} deck={deck} />
        </Route>
      </Switch>
    </>
  );
}

export default DeckInfo;
