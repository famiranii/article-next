import { useReducer } from "react";
const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      let isFormValid = true;
      for (const inputId in state.inputValue) {
        if (inputId === action.id) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputValue[inputId].isValid;
        }
        if (state.inputValue[inputId].value==="") {
          isFormValid = false;
        }
      }
      return {
        inputValue: {
          ...state.inputValue,
          [action.id]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: isFormValid,
      };
    }
    default: {
      return state;
    }
  }
};

export default function UseForm(inputValue, isFormValid) {
  const [formState, dispatch] = useReducer(formReducer, {
    inputValue,
    isFormValid,
  });
  const getInputInfo = (id, value, isValid) => {
    dispatch({
      type: "CHANGE",
      id,
      value,
      isValid,
    });
  };
  return [formState, getInputInfo];
}
