function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId() {
  return `abcd-${randomInteger(11111, 99999)}-efgh`;
}

export { generateId };
