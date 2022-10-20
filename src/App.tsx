import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import List from './Components/List';
import Form from './Components/Form';
import {Sub} from './types.d';

const INITIAL_STATE=[
    {
      nick: 'locostat2',
      subMonth: 3,
      avatar: 'https://i.pravatar.cc/150?u=locostat2',
      description: 'a este tipo le tenemos que cambiar el nick'
    },
    {
      nick: 'Anonymous',
      subMonth: 4,
      avatar: 'https://i.pravatar.cc/150?u=anonymous'
    }
  ];


interface AppState{
  sub: Array<Sub>;
  newSubsNumber: number;
}

function App() {

  const [subs,setSubs] = useState<AppState["sub"]>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect( () => {
    setSubs(INITIAL_STATE)
  }, [])

  const handleNewSubs = (newSub: Sub): void =>{
    setSubs(subs => [...subs,newSub])
  }
  
  return (
    <div className="App" ref= {divRef}>
      <h1>Subscriptores!</h1>
      <List subs={subs} />
      <Form onNewSub={handleNewSubs}/>
    </div>
  );
}

export default App;
