const checkIfJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const format = (message: any) => {
  if (checkIfJson(message)) {
    return JSON.stringify(message);
  }
  return message;
};
