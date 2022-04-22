/* eslint-disable no-param-reassign */
const bookingForm = document.forms.booking_form;
const { fname, lname } = bookingForm.elements;

const SECOND = 1000;
const MODAL_CLEAR_TIME = 3;

function checkIfNameCorrect(input) {
  return input.value === '' || input.value.length > 40;
}

function turnOnIncorrectInput(input) {
  input.classList.add('input_box_error');
  input.parentNode.querySelector('#input_error').style.display = 'block';
}

function turnOffIncorrectInput(input) {
  input.classList.remove('input_box_error');
  input.parentNode.querySelector('#input_error').style.display = 'none';
}

function createModalBackground() {
  const modalBackground = document.createElement('div');
  modalBackground.classList.add('modal_background');
  return modalBackground;
}

function createModalSummary() {
  const modalSummary = document.createElement('ul');
  Array.from(bookingForm.elements)
    .filter((e) => e.tagName.toLowerCase() === 'input')
    .map((e) => e.value)
    .forEach((e) => {
      const listElement = document.createElement('li');
      listElement.innerHTML = e;
      modalSummary.appendChild(listElement);
    });
  return modalSummary;
}

function createModalContent() {
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal_content');
  return modalContent;
}

function createModalOkButton(closeModalTimeout, clearModalFunction) {
  const modalOkButton = document.createElement('button');
  modalOkButton.innerHTML = 'Ok';
  modalOkButton.addEventListener('click', () => {
    clearTimeout(closeModalTimeout);
    clearModalFunction();
  });
  return modalOkButton;
}

function generateSuccessModal() {
  const modal = createModalBackground();
  const modalContent = createModalContent();
  const modalSummary = createModalSummary();

  const clearModalFunction = () => document.body.removeChild(modal);
  const closeModalTimeout = setTimeout(() => document
    .body
    .removeChild(modal), MODAL_CLEAR_TIME * SECOND);

  const modalOkButton = createModalOkButton(closeModalTimeout, clearModalFunction);

  modalContent.appendChild(modalSummary);
  modalContent.appendChild(modalOkButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Checks if input is correct and then display a modal
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isCorrect = true;
  if (checkIfNameCorrect(fname)) {
    turnOnIncorrectInput(fname);
    isCorrect = false;
  }
  if (checkIfNameCorrect(lname)) {
    turnOnIncorrectInput(lname);
    isCorrect = false;
  }
  if (isCorrect) {
    turnOffIncorrectInput(lname);
    turnOffIncorrectInput(fname);
    generateSuccessModal();
  }
});
