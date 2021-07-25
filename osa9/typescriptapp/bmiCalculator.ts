const calculateBmi = (heightCm: number, weightKg: number): string => {
  const bmi = weightKg / (heightCm / 100) ** 2

  if ((bmi >= 18.5) && (bmi < 25)) {
    return 'Normal (healthy weight)'
  }

  else return 'BMI not normal'
}

// Should print "Normal (healthy weight)"
console.log(calculateBmi(180, 74))
