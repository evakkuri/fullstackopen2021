import { Patient } from "../src/types";
import { toNewPatient } from '../src/utils';
import patientData from './patients.json';

const patients: Array<Patient> = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patients;
