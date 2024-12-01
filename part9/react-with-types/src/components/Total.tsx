type TotalExercisesProps = {
  totalExercises: number
}

const Total: React.FC<TotalExercisesProps> = ({ totalExercises }) => {
  return <p>
    Number of exercises {totalExercises}
  </p>
}

export default Total
