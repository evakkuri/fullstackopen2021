import React from "react";
import { CoursePart, CourseParts } from "../types";

const ContentItem = ({ name, exerciseCount }: CoursePart) => {
  return (
    <div>
      <p>
        {name} {exerciseCount}
      </p>
    </div>
  )
}

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map(part => ContentItem(part))}
    </div>
  )
}

export default Content
