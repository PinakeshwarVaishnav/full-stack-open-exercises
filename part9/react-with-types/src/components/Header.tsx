type CourseNameProps = {
  courseName: string
}

const Header: React.FC<CourseNameProps> = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

export default Header
