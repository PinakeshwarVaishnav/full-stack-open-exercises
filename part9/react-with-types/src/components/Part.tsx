import { CoursePart } from "../types/types"

interface PartProps {
  coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `unhandled discriminated union member:
    ${JSON.stringify(value)}`
  )
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <p>
          {coursePart.name}
          <br />
          {coursePart.exerciseCount}
          <br />
          {coursePart.description}
        </p>
      )
    case 'group':
      return (
        <p>
          {coursePart.name}
          <br />
          {coursePart.exerciseCount}
          <br />
          {coursePart.groupProjectCount}
        </p>
      )
    case 'background':
      return (
        <p>
          {coursePart.name}
          <br />
          {coursePart.exerciseCount}
          <br />
          {coursePart.description}
          <br />
          {coursePart.backgroundMaterial}
        </p>
      )
    case 'special':
      return (
        <p>
          {coursePart.name}
          <br />
          {coursePart.exerciseCount}
          <br />
          {coursePart.description}
          <br />
          {coursePart.requirements}
        </p>
      )
    default:
      return assertNever(coursePart)
  }
}

export default Part
