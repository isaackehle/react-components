import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const MAX = 5;

const genArray = (cnt: number, val: boolean) => Array.from(Array(cnt).keys()).map((x) => val);

const StarRatings = () => {
  const [rating, setRating] = useState([false, false, false, false, false]);

  function pickStar(val: boolean, key: number) {
    if (val) {
      return <FaStar onClick={() => setRating(startClicked(key))} />;
    }

    return <FaRegStar onClick={() => setRating(startClicked(key))} />;
  }

  const startClicked = (key: number): boolean[] => {
    const newVal = !rating[key];

    // When the star is being toggled on
    if (newVal) {
      return [...genArray(key + 1, true), ...genArray(MAX - key - 1, false)];
    }

    // When the star is being toggled off, turn all off when the last star was clicked
    if (key === MAX - 1) return genArray(MAX, false);

    return [...genArray(key, true), ...genArray(MAX - key, false)];
  };

  return (
    <dl>
      {rating.map((x, key) => (
        <React.Fragment key={key}>{pickStar(x, key)}</React.Fragment>
      ))}
    </dl>
  );
};

export default StarRatings;
