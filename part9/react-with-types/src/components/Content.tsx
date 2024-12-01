import Part from "./Part"
import { CoursePart } from "../types/types"

type CoursePartProps = {
  courseParts: CoursePart[]
}

const Content: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(coursePart => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div >
  )
}

export default Content
