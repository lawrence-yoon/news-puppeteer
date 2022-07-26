import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import './testarrayreal'
import testArrayReal from "./testarrayreal";

// const testArray = [
//   {
//     title:"title01",
//     author:"author01",
//     summary:"summary01",
//     timestamp:"timestamp01"
//   },
//   {
//     title:"title02",
//     author:"author02",
//     summary:"summary02",
//     timestamp:"timestamp02"
//   },
//   {
//     title:"title03",
//     author:"author03",
//     summary:"summary03",
//     timestamp:"timestamp03"
//   },
//   {
//     title:"title04",
//     author:"author04",
//     summary:"summary04",
//     timestamp:"timestamp04"
//   }
// ];

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
  return (
    <div className="container-sm text-success">
      <h1>APNews Scraper</h1>
      <h6>APNews Scraper provides world news, plain and simple. No ads, no bias.</h6>
      {testArrayReal.map(createEntry)}
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
