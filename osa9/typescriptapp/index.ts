import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightCm = Number(req.query.height)
  const weightKg = Number(req.query.weight)

  if ((!heightCm) || (!weightKg)) {
    res.status(404).json({error: "Malformatted parameters"})
  }

  const bmiResponse = calculateBmi(heightCm, weightKg)

  const response = {
    weight: weightKg,
    height: heightCm,
    bmi: bmiResponse
  }

  res.json(response)
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});