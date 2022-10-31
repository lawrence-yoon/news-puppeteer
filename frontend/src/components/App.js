import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import "./App.css";

function createEntry(testEntry){
  return (
    <div className="row bg-dark text-success border border-success customCard">
      <p><b>{testEntry.title}</b></p>
      <p>{testEntry.author}</p>
      <a href={testEntry.hyperlink}>Link to Article</a>
      <p>{testEntry.article_timestamp}</p>
    </div>
  )
}


function App() {
  const [initialState, setInitialState] = useState([])

  useEffect(()=>{
    fetch('/api/')
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(jsonResponse => setInitialState(jsonResponse[0]))
  }, [])
  return (
    <div className="container-sm text-success viewMain">
      <div className="titleText">
        <h1>Outside News</h1>
        <h6>Minimalist world news web scraper</h6>
      </div>    
      <div className="articleCards">
        {initialState.map(createEntry)}
      </div>
    </div>
  );
}

export default App;
