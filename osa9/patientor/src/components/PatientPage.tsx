import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage = () => {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatient = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch({ type: "ADD_PATIENT", payload: patient });
      } catch (e) {
        console.log(e);
      }
    };

    if (!state.patients[id]) {
      void getPatient(id);
    }
  }, [dispatch]);

  const patientToShow = state.patients[id];
  console.log(patientToShow);

  if (!patientToShow) {
    return null;
  }

  const genderToIcon: {[id: string]: SemanticICONS | undefined} = {
    male: "mars",
    female: "venus",
    other: "neuter"
  };

  return (
    <div>
      <h1>{patientToShow.name} <Icon name={genderToIcon[patientToShow.gender]} /></h1>
      <p>
        <span>SSN: {patientToShow.ssn}</span><br />
        <span>Occupation: {patientToShow.occupation}</span>
      </p>
    </div>
  );
};

export default PatientPage;
