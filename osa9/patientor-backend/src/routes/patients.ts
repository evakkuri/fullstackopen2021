/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuidv4 } from 'uuid';

import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../parsers/patient';
import { toNewEntry } from '../parsers/patientEntry';
import { Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log("Getting patients...");
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  console.log(patient);
  patient ? res.send(patient) : res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.body);

  try {
    const newEntry: Entry = {
      ...toNewEntry(req.body),
      id: uuidv4(),
    };

    const updatedPatient = patientService.addEntry(
      req.params.id,
      newEntry
    );

    if (!updatedPatient)
      res.status(404).send(`Patient with ID ${req.params.id} not found.`);

    res.json(updatedPatient);

  } catch (e) {
    res.status(400).send(`Error: ${e}`);
  }
});

export default router;
