type Result = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

type Input = {
  dailyExerciseHrs: Array<number>,
  targetAvgHrs: number
};

const exerciseParseCliArguments = (args: Array<string>): Input => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const argNums = args
    .slice(2)
    .map((elem) => Number(elem));

  if (argNums.some((elem) => isNaN(elem))) {
    throw new Error('Provided values were not numbers!');
  }

  const targetAvgHrs = argNums[0];
  const dailyExerciseHrs = argNums.slice(1);

  return {
    dailyExerciseHrs,
    targetAvgHrs
  };
};


const excerciseCalculator = (dailyExerciseHrs: Array<number>, targetAvgHours: number): Result => {
  const averageHrs = dailyExerciseHrs.reduce((val1, val2) => val1 + val2) / dailyExerciseHrs.length;

  type Rating = {
    rating: number,
    ratingDescription: string
  };

  const rating = (averageHrs: number, targetAvgHours: number): Rating => {

    if (averageHrs < targetAvgHours) {
      if (Math.abs((averageHrs - targetAvgHours) / targetAvgHours) <= 0.2) {
        return { rating: 2, ratingDescription: 'Not bad but could be better' };
      }
      else return { rating: 1, ratingDescription: 'Abysmal...' };
    }
    else return { rating: 3, ratingDescription: 'Great success!' };
  };

  const actualRating = rating(averageHrs, targetAvgHours);

  const result = {
    periodLength: dailyExerciseHrs.length,
    trainingDays: dailyExerciseHrs.filter(val => val > 0).length,
    success: averageHrs >= targetAvgHours,
    rating: actualRating.rating,
    ratingDescription: actualRating.ratingDescription,
    target: targetAvgHours,
    average: averageHrs
  };

  return result;
};

export const runExerciseCalculator = () => {
  try {
    const { dailyExerciseHrs, targetAvgHrs } = exerciseParseCliArguments(process.argv);
    console.log(excerciseCalculator(dailyExerciseHrs, targetAvgHrs));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }
}

export default excerciseCalculator;

//console.log(excerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))
//console.log(excerciseCalculator([0, 0, 0, 0, 0, 0, 0], 2))

/*

*/
