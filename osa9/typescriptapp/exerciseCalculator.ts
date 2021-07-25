type Result = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const excerciseCalculator = (dailyExerciseHrs: Array<number>, targetAvgHours: number) : Result => {
  const averageHrs = dailyExerciseHrs.reduce((val1, val2) => val1 + val2) / dailyExerciseHrs.length

  type Rating = {
    rating: number,
    ratingDescription: string
  }

  const rating = (averageHrs: number, targetAvgHours: number): Rating => {
  
    if (averageHrs < targetAvgHours) {
      if (Math.abs((averageHrs - targetAvgHours) / targetAvgHours) <= 0.1) {
        return {rating: 2, ratingDescription: 'Not bad but could be better'}
      }
      else return {rating: 1, ratingDescription: 'Abysmal...'}
    }
    else return {rating: 3, ratingDescription: 'Great success!'}
  }

  const actualRating = rating(averageHrs, targetAvgHours)

  const result = {
    periodLength: dailyExerciseHrs.length,
    trainingDays: dailyExerciseHrs.filter(val => val > 0).length,
    success: averageHrs >= targetAvgHours,
    rating: actualRating.rating,
    ratingDescription: actualRating.ratingDescription,
    target: targetAvgHours,
    average: averageHrs
  }

  return result
}

console.log(excerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))
console.log(excerciseCalculator([0, 0, 0, 0, 0, 0, 0], 2))
