type CoursePart = {
  name: string,
  exerciseCount: number
}

type CoursePartProps = {
  courseParts: CoursePart[]
}

const Content: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(coursePart => (
        <div key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </div>
      ))}
    </div >
  )
}

export default Content
