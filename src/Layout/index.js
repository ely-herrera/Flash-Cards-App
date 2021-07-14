import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import ListDeck from './Decks/ListDeck';
import DeckForm from './Decks/DeckForm';
import DeckInfo from './Decks/DeckInfo';
import { Switch, Route, Link } from 'react-router-dom';

function Layout() {
  const initialDeckForm = {
    title: 'Deck Name',
    inputTitle: 'Name',
    inputDescript: 'Description',
    submitType: 'newDeck',
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <ListDeck />
          </Route>
          <Route exact path="/decks/new">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
              </ol>
            </nav>
            <DeckForm formProps={initialDeckForm} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckInfo />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
