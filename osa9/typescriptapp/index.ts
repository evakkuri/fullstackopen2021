import express from 'express';
const middleware = require('./utils/middleware');
import calculateBmi from './src/bmiCalculator';
import excerciseCalculator from './src/exerciseCalculator';

const app = express();
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightCm = Number(req.query.height);
  const weightKg = Number(req.query.weight);

  if ((!heightCm) || (!weightKg)) {
    res.status(400).json({ error: "Malformatted parameters" });
  }

  const bmiResponse = calculateBmi(heightCm, weightKg);

  const response = {
    weight: weightKg,
    height: heightCm,
    bmi: bmiResponse
  };

  res.json(response);
});

app.post('/exercise', (req, res) => {
  const body = req.body

  const bodyKeys = Object.keys(body)
  console.log(bodyKeys)
  if (!(bodyKeys.includes("daily_exercises") && bodyKeys.includes("target"))) {
    res.status(400)
      .json({ error: "Parameters missing. Expected parameters in body: 'daily_exercises', 'target'" })
    return null
  }

  const dailyExerciseHrs = body.daily_exercises
  const target = body.target

  if (!(Array.isArray(dailyExerciseHrs)) || (dailyExerciseHrs.some(isNaN)) || (isNaN(target))) {
    res.status(400)
      .json({ error: "Malformatted parameters." })
    return null
  }

  const result = excerciseCalculator(dailyExerciseHrs, target)
  res.status(200).json(result)
  return result
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});