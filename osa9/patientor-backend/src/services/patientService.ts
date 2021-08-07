import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patientsExpanded';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId } from '../types';

let patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const makeNonSensitive = (patient: Patient): NonSensitivePatient => {
  const { id, name, dateOfBirth, gender, occupation, entries } = patient;
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  };
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients
    .map((patient) => makeNonSensitive(patient));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);

  if (!patient) return undefined;

  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, newEntry: EntryWithoutId): Patient | undefined => {
  const currPatient = patients.find((p) => p.id === patientId);

  if (!currPatient) return undefined;

  const patientWithNewEntry: Patient = {
    ...currPatient,
    entries: currPatient.entries.concat({...newEntry, id: uuidv4()})
  };

  patients = patientData.map(
    (p) => p.id === patientId ? patientWithNewEntry : p);
  return patientWithNewEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntry
};
