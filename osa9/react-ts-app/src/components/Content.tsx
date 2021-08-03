import React from "react";
import { CoursePart, CourseParts } from "../types";
import { assertNever } from "../utils";

const Part = (part: CoursePart) => {

  const renderSwitch = (part: CoursePart) => {
    switch (part.type) {
      case "normal":
        return <i>{part.description}</i>
      case "groupProject":
        return <span>Number of group exercises {part.groupProjectCount}</span>
      case "submission":
        return (
          <span>
            <i>{part.description}</i><br/>
            <span>Submit to: {part.exerciseSubmissionLink}</span>
          </span>
        )
      case "special":
        return <span>Required skills: {part.requirements.join(', ')}</span>
      default:
        return assertNever(part)
    }
  }

  return (
    <div>
      <p>
        <b>{part.name} {part.exerciseCount}</b><br />
        {renderSwitch(part)}
      </p>
    </div>
  )
}

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map(part => Part(part))}
    </div>
  )
}

export default Content
