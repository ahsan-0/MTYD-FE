function Tutorial() {
  return (
    <div className="tutorial">
      <h1>Tutorial</h1>
      <h4>Loneliness: A cell with less than 2 adjoining neighbors dies.</h4>
      <img src="/ruleOne.png" alt="rule one" />
      <h4>OverCrowding: A cell with more than three adjoining cells dies.</h4>
      <img src="/ruleTwo.png" alt="rule two" />
      <h4>Reproduction: An empty cell with more than three adjoining cells comes alive.</h4>
      <img src="/ruleThree.png" alt="rule three" />
      <h4>Stasis: A cell with exactly two adjoining cells remains the same</h4>
      <img src="/ruleFour.png" alt="rule four" />
    </div>
  );
}

export default Tutorial;
