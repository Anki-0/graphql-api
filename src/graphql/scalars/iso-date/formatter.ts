// Parses an RFC 3339 compliant date-time-string into a Date.
export const parseDateTime = (dateTime: string): Date => {
  return new Date(dateTime);
};
