import diaryData from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntriesPick =
  (): Array<Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>> => {
    return diaries;
  };

const getNonSensitiveEntriesOmit = (): Omit<DiaryEntry, 'comment'>[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry [] => {
  /*
  NOTE: Even though NonSensitiveDiaryEntry doesn't contain 'comments' as
  a type, the field is returned together with other data. 
  => Omission is only for compiler.
  We need to explicitly remove the field so that it is not shown in frontend.
  */
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntriesPick,
  getNonSensitiveEntriesOmit,
  getNonSensitiveEntries,
  addEntry
};