import '../pages/index.css';

import {createCard} from './cards.js';
import {showPopup, hidePopup} from './modal.js';
import {enableValidation, disableButton, enableButton} from './validation.js';

import antalya from '../images/antalya.jpg';
import fyord from '../images/Geiranger_Fjord.jpg';
import kiso from '../images/kiso.jpg';
import mars from '../images/Mars.jpg';
import spb from '../images/Sankt-Peterburg.jpg';
import texas from '../images/Texas.jpg';

const initialCards = [
    {
      name: 'Анталья',
      link: antalya
    },
    {
      name: 'Фьерд Гайрангер',
      link: fyord
    },
    {
      name: 'Кисо',
      link: kiso
    },
    {
      name: 'Марс',
      link: mars
    },
    {
      name: 'Санкт-Петербург',
      link: spb
    },
    {
      name: 'Техас',
      link: texas
    }
];


const popupProfile = document.querySelector('.js-popup-profile');
const popupCard = document.querySelector('.js-popup-card');
const popupImage = document.querySelector('.js-popup-image');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileCloseButton = popupProfile.querySelector('.popup__btn-close');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupCardCloseButton = popupCard.querySelector('.popup__btn-close');
const popupImageCloseButton = popupImage.querySelector('.popup__btn-close');
const profileNameInput = popupProfile.querySelector('input[name=profile-name]');
const profileAboutInput = popupProfile.querySelector('input[name=profile-about]');
const cardsArea = document.querySelector('.photo-grid');
const imagePopupImage = popupImage.querySelector('.popup__image');
const imagePopupImageCaption = popupImage.querySelector('.popup__caption');
const popupCardSubmit = popupCard.querySelector('.popup__submit');


const cardPlaceName = popupCard.querySelector('input[name=new-card-name]');
const cardImageLink = popupCard.querySelector('input[name=new-card-link]');
const cardFormArea = popupCard.querySelector('.popup__form');
const profileFormArea = popupProfile.querySelector('.popup__form');

export const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

function addCard(cardName, cardLink) {
    const card = createCard(cardName, cardLink);
    cardsArea.prepend(card);
}

initialCards.forEach(function (card) {
    addCard(card.name, card.link);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(cardPlaceName.value, cardImageLink.value);
    cardFormArea.reset();
    hidePopup(popupCard);
    disableButton(popupCardSubmit,validationElements.inactiveButtonClass);
}

profileEditButton.addEventListener('click', function () {
    profileAboutInput.value = profileAbout.textContent; 
    profileNameInput.value = profileName.textContent;
    showPopup(popupProfile);
})

profileCloseButton.addEventListener('click', function () {
    hidePopup(popupProfile);
})

cardAddButton.addEventListener('click', function () {
    showPopup(popupCard);
    enableButton(popupCardSubmit);
})

popupCardCloseButton.addEventListener('click', function () {
    hidePopup(popupCard);
})

popupImageCloseButton.addEventListener('click', function () {
    hidePopup(popupImage);
})

cardFormArea.addEventListener('submit', handleCardFormSubmit);
profileFormArea.addEventListener('submit', handleProfileFormSubmit);


export function showPopupImage(caption, link) {
    imagePopupImage.src = link;
    imagePopupImage.alt = caption;
    imagePopupImageCaption.textContent = caption;
    showPopup(popupImage);
}


export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    hidePopup(popupProfile);
}

enableValidation(validationElements);