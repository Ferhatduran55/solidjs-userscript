const RandomDate = () => {
  const randomDate = new Date(
    new Date().getTime() + Math.random() * 10000000000
  );
  return randomDate.toISOString();
};

export default RandomDate;