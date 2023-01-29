function PatternsCard({ patternId, username, patternBody, patternName }) {
  return (
    <div key={patternId}>
      <p>Username: {username}</p>
      <p>Pattern Name: {patternName}</p>
      <p>Pattern: {patternBody}</p>
    </div>
  );
}

export default PatternsCard;
