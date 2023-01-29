import { useEffect, useState } from "react";
import { getPatterns } from "../api";
import produce from "immer";
import PatternsCard from "./PatternsCard";
function Patterns({}) {
  const [patternsData, setPatternsData] = useState([]);
  useEffect(() => {
    getPatterns().then(({ data }) => {
      setPatternsData(data.patterns);
      // setGrid(arr);
    });
  }, []);
  // console.log(patternsData[0].pattern_body);
  const str = "0101001101 1011001010 0011011010 1000101010 0100101000 1101100000 1010000011 1111000000 0100101010 0000101010";
  const arr = str.split(" ").map((m) => m.split("").map((m) => +m));
  // console.log(arr);

  return (
    <div>
      {arr.map((row, i) => (
        <div key={i}>
          {row.map((col, j) => (
            <div key={j} className={col === 1 ? "colored" : ""}>
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  // patternsData.map((pattern) => {
  //   return <PatternsCard patternId={pattern._id} username={pattern.username} patternBody={pattern.pattern_body} patternName={pattern.pattern_name} />;
  // });
}
export default Patterns;
