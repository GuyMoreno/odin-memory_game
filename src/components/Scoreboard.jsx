// Will display the score & the best score
// מידע מועבר בין קומפננטות
// דרך פרופס...
// Parent = App
// Child = Scoreboard
// So scoreboard just recives data
// Props are like knobs 🎛️ 
// 
function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      {/* Here the child scoreboard uses the knobs
      // Using the props. */}
      <p>Current Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
}

export default Scoreboard;