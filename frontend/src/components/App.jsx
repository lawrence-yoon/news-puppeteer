import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./App.css";
import testArrayReal from './testarrayreal';

function createEntry(testEntry){
  return (
    <div className="row bg-dark text-success border border-success customCard">
      <p><b>{testEntry.title}</b></p>
      <p>{testEntry.author}</p>
      <p>{testEntry.summary}</p>
      <p>{testEntry.article_timestamp}</p>
    </div>
  )
}


function App() {
  fetch('http://localhost:3001/api')
    .then(response=>response.json())
    .then(data=>console.log(data))
  return (
    <div className="container-sm text-success">
      <div className="titleText">
        <h1>APNews Scraper</h1>
        <h6>APNews Scraper provides world news, plain and simple. No ads, no bias.</h6>
      </div>    
      <div className="articleCards">
        {testArrayReal.map(createEntry)}
      </div>
    </div>
  );
}

export default App;
//make different module for the card thing, where a card
//is generated from stuff in a database.
//for now, try to pass the data from backend, and generate cards

//add a text to speech. it will read story title, author, and summary blurb

//make a hamburger menu
//option1: trending
//option2: US
//option3: World

//i need to decide if ppl should have access to all the database.
//i am thinking, i will only give them access to last 100 per option.
//for now, i will keep it running and scrape daily, show all that was scraped.
