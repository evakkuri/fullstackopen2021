export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseStringField = (stringFieldName: string, stringFieldValue: unknown): string => {
  if (!stringFieldValue || !isString(stringFieldValue)) {
    throw new Error(`Incorrect of missing value for field ${stringFieldName}`);
  }

  return stringFieldValue;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (dateFieldName: string, dateFieldValue: unknown): string => {
  if (!dateFieldValue || !isString(dateFieldValue) || !isDate(dateFieldValue)) {
    throw new Error(`Incorrect or missing value for field ${dateFieldName}: ${dateFieldValue}`);
  }

  return dateFieldValue;
};
