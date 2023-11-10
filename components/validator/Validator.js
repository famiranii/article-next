const validator = (value, validation) => {
  for (const validator of validation) {
    if (validator.value === "MAX") {
      if (value.trim().length > validator.max) {
        return false;
      }
    } else if (validator.value === "MIN") {
      if (value.trim().length < validator.min) {
        return false;
      }
    } else if (validator.value === "EMAIL") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(value);
    }
  }
  return true;
};

export default validator;
