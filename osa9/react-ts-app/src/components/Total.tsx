import React from "react";
import { CourseParts } from "../types";

const Total = ({ courseParts }: CourseParts) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total
