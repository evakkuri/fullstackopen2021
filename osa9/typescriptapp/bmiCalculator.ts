type Size = {
  heightCm: number,
  weightKg: number
}

const bmiParseArguments = (args: Array<string>): Size => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (heightCm: number, weightKg: number): string => {
  const bmi = weightKg / (heightCm / 100) ** 2

  if ((bmi >= 18.5) && (bmi < 25)) {
    return 'Normal (healthy weight)'
  }

  else return 'BMI not normal'
}

try {
  const { heightCm, weightKg } = bmiParseArguments(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}