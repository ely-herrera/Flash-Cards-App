import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../Home';
import Study from '../Study';
import CreateDeck from '../Deck/CreateDeck';
import EditDeck from '../Deck/EditDeck';
import DeckScreen from '../Deck/DeckScreen';
import AddCard from '../Deck/Cards/AddCard';
import EditCard from '../Deck/Cards/EditCard';
import { Switch, Route } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path={'/decks/:deckId/study'}>
            <Study />
          </Route>
          <Route path={'/decks/new'}>
            <CreateDeck />
          </Route>
          <Route path={'/decks/:deckId/cards/:cardId/edit'}>
            <EditCard />
          </Route>
          <Route path={'/decks/:deckId/cards/new'}>
            <AddCard />
          </Route>
          <Route path={'/decks/:deckId/edit'}>
            <EditDeck />
          </Route>
          <Route path={'/decks/:deckId'}>
            <DeckScreen />
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
