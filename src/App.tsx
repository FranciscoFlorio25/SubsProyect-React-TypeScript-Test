import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import List from './Components/List';
import Form from './Components/Form';
import {Sub,SubsResponseFromApi} from './types.d';
import axios from 'axios';
import { SubstitutionType } from 'typescript';


interface AppState{
  sub: Array<Sub>;
  newSubsNumber: number;
}

function App() {

  const [subs,setSubs] = useState<AppState["sub"]>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect( () => {
    const fetchSubs = ()=>{
      return axios
      .get<SubsResponseFromApi>('http://localhost:300/subs')
      .then(response => response.data)
    }

  const mapFromApiToSubs = ( apiResponse: SubsResponseFromApi):
    Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const{
          months: subMonth,
          profileUrl:avatar,
          nick,
          description,
        } = subFromApi
        return {
          nick,
          subMonth,
          description,
          avatar
        }
      })
    }

  fetchSubs()
     .then(mapFromApiToSubs)
    .then(setSubs)
  }, [])

  const handleNewSubs = (newSub: Sub): void =>{
    setSubs(subs => [...subs,newSub])
    setNewSubsNumber(n => n + 1)
  }
  
  return (
    <div className="App" ref= {divRef}>
      <h1>Subscriptores!</h1>
      <List subs={subs} />
      New sub: {newSubsNumber}
      <Form onNewSub={handleNewSubs}/>
    </div>
  );
}

export default App;
