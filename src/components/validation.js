import { validationElements } from "./index.js";

const showInputError = (formElement, inputElement, errorMessage,config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationElements.inputErrorClass);
    errorElement.textContent = errorMessage
    errorElement.classList.add(validationElements.errorClass);
};

const hideInputError = (formElement, inputElement,config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationElements.inputErrorClass);
    errorElement.classList.remove(validationElements.errorClass);
    errorElement.textContent = '';
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement,config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationElements.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationElements.inactiveButtonClass);
      buttonElement.disabled = false;
    }
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};


const setEventListeners = (formElement,conifg) => {
    const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
    const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
};

export function disableButton (button, addClass) {
  button.classList.add(addClass);
  button.disabled=true;
}

export function enableButton (button) {
  button.disabled=false;
}