const emailValidator = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export default emailValidator;
