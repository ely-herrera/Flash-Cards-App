import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../Home';
import { Switch, Route } from 'react-router-dom';
import CreateDeck from './Decks/CreateDeck';
import Deck from './Decks/Deck';
import EditDeck from './Decks/EditDeck';
import EditCard from './Cards/EditCard';
import AddCard from './Cards/AddCard';
import Study from '../Study';
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
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
