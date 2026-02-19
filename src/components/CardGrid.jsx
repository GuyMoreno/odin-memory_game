// Grid
import Card from './Card';

// What does it get from the parent App?
    // cards
    // onClick 
function CardGrid({ cards, onCardClick }) {
  return (
    <div className="card-grid">
        {/* The map
        changes data into jsx component
        to individual cards */}
      {cards.map((card) => (
        <Card 
        // id? key?
            // with that we'll know
            // which card moved and to where 
          key={card.id} 
          name={card.name} 
          image={card.image} 
            // Which card clicked? Ohhh pikacho...   
          onClick={() => onCardClick(card.id)} 
        />
      ))}
    </div>
  );
}

export default CardGrid;