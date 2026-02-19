// Import some hooks
import { useState, useEffect } from 'react'
import Scoreboard from './components/Scoreboard';
import './App.css'
import CardGrid from './components/CardGrid';

// The control center of the game

function App() {
  // cards list
  // It's an empty array to store the cards data from api
  // setCards will update the list and react will render
  // Every use state is a memory drawer
  const [cards, setCards] = useState([]);
  // When we use - useState we tell react 
  // I need this component to remember something
  // It started as an empty array.
  // It returns 2 things:
    // cards: 1st empty afterwards the 12 pokemons
    // setCards: updates cards:
      // It replaces with new data new pokemons
      // 1st time: setCards(fetchedPokemons)
      // 2nd time: setCards(shuffledArray)

  // curren score & best score
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Track of clicked cards
  const [clickedCardIds, setClickedCardIds] = useState([]);

  // 3. The useEffect (Our API fetcher)
  useEffect(() => {
    //  fetchPokemons is a function
    // async? it will take time...
    const fetchPokemons = async () => {
    /* 1. Get list of 12 pokemons */
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
    // data? var stores the data
    // await? tell the computer to wait until
    // the server response...
    const data = await response.json();
    
    /* 2. Get details (images) for each pokemon */
    const pokemonDetails = await Promise.all(
      // Loop throgh every pokemon 'p'
      // 
      data.results.map(async (p) => {
        // here we go inside every pokemon adress data
        const res = await fetch(p.url);
        // res = response
        // change the json to obj that JS can work with
        const detail = await res.json();
        return {
          id: detail.id,
          name: detail.name,
          image: detail.sprites.front_default
        };
      })
    );

    // Update state with final list
    setCards(pokemonDetails);

    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  fetchPokemons();
  // Empty array 👇🏼 means run only once on mount
  }, []);

  /* Helper function to manage scores */
const handleScore = () => {
  const newScore = score + 1;
  setScore(newScore);
  if (newScore > bestScore) {
    setBestScore(newScore);
  }
};

const shuffleCards = () => {
    // 1. Create a copy of the cards array
    const shuffled = [...cards]
      // 2. Sort it randomly
      .sort(() => Math.random() - 0.5);
    
    // 3. Update state to trigger re-render
    setCards(shuffled);
  };

  // 4. Game logic functions (We will write these next)
  const handleCardClick = (id) => {
    /* Check if card was already clicked */
    const isAlreadyClicked = clickedCardIds.includes(id);

    if (isAlreadyClicked) {
      /* GAME OVER logic */
      console.log('Game Over! You clicked same card twice.');
      setScore(0);
      setClickedCardIds([]);
    } else {
      /* WIN POINT logic */
      console.log('Nice! New card.');
      handleScore(); // We will write this helper next
      // IN REACT WE DON'T CHANGE AN EXISTING ARRAY!
      // Take all the old values and add the new id
      setClickedCardIds([...clickedCardIds, id]);
    }

    /* Shuffling logic will go here too */
    shuffleCards();
  };


return (
    <div className="App">
      <h1>Memory Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  )
}

export default App

