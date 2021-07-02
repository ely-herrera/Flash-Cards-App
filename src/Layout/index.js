import React, { useEffect, useState } from 'react';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../Home';
import Study from '../Study';
import CreateDeck from './Decks/CreateDeck';
import EditDeck from './Decks/EditDeck';
import DeckScreen from './Decks/DeckScreen';
import AddCard from './Cards/AddCard';
import EditCard from './Cards/EditCard';
import { Switch, Route } from 'react-router-dom';
import { listDecks } from '../utils/api';

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function allDecks() {
      const everyDeck = await listDecks();
      setDecks(everyDeck);
    }
    allDecks();
  }, []);

  const initialDeckForm = {
    title: 'Deck Name',
    inputTitle: 'Name',
    inputDescript: 'Description',
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <Home decks={decks} />
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
