// A single card
// Also here the func component recieves an obj and destructuing it
// Besides name and img, the obj recives another func!
// Another func that the Father App send to the child Card

function Card({ name, image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default Card;