import '../pages/index.css';

import { getInitialCard, getProfileData, editProfile, publishCard, editAvatar} from './api.js';
import {renderCard, addCard, popupImage} from './cards.js';
import {showPopup, hidePopup} from './modal.js';
import {enableValidation, disableButton, enableButton} from './validation.js';

// avatar section

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarEditButton = document.querySelector('.profile__avatar-edit-button');


// card section 
const cardAddButton = document.querySelector('.profile__add-button');
const cardsArea = document.querySelector('.photo-grid');

// popups
const popupCard = document.querySelector('.js-popup-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardSubmit = popupCard.querySelector('.popup__submit');
const cardPlaceName = popupCard.querySelector('input[name=new-card-name]');
const cardImageLink = popupCard.querySelector('input[name=new-card-link]');

const popupProfile = document.querySelector('.js-popup-profile');
const profileNameInput = popupProfile.querySelector('input[name=profile-name]');
const profileAboutInput = popupProfile.querySelector('input[name=profile-about]');
const profileSubmit = popupProfile.querySelector('.popup__submit');

const popupAvatar = document.querySelector('.js-popup-avatar');
const popupAvatarInput = popupAvatar.querySelector("input[name=url]");
const popupAvatarSubmit = popupAvatar.querySelector('.popup__submit');


const popupCardCloseButton = popupCard.querySelector('.popup__btn-close');
const popupImageCloseButton = popupImage.querySelector('.popup__btn-close');
const profileCloseButton = popupProfile.querySelector('.popup__btn-close');
const popupAvatarCloseButton = popupAvatar.querySelector('.popup__btn-close');

//profile
const profileData = {};

export const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

function renderProfile (profileData) {
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileAvatar.src = profileData.avatar;
}

function setProfileData (data) {
    profileData.name = data.name;
    profileData.about = data.about;
    profileAbout.avatar = data.avatar;
    profileAbout.id = data._id;
}

function changeButtonText (button, text) {
    button.value = text;
}

getProfileData()
.then((data) => {
    setProfileData(data);
    renderProfile(profileData);
    getInitialCard()
    .then((data) => {
        data.reverse().forEach(item => addCard(renderCard(item, profileData.id)));
    })
    .catch((err) => {
        console.log(err);
    })
})
.catch((err) => {
    console.log(err);
})

function handleEditProfile () {
    showPopup(popupProfile);
    profileName.value = profileData.name;
    profileAbout.value = profileData.about;
}

function handleEditProfileAvatar () {
    showPopup(popupAvatar);
}

function handleNewCard () {
    showPopup(popupCard);
}

function editProfileData (evt) {
    evt.preventDefault();
    changeButtonText(profileSubmit, 'Сохранине...');
    editProfile(profileNameInput.value, profileAboutInput.value)
    .then((data) => {
        setProfileData(data);
        renderProfile(data);
        hidePopup(popupProfile);
        disableButton(profileSubmit, validationElements.inactiveButtonClass);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(function () {
        changeButtonText(profileSubmit, 'Сохранить');
    })
}

function editAvatarPic (evt) {
    evt.preventDefault();
    changeButtonText(popupAvatarSubmit, 'Сохранине...');
    editAvatar(popupAvatarInput.value)
    .then((data) => {
        setProfileData(data);
        renderProfile(data);
        hidePopup(popupAvatar);
        disableButton(popupAvatarSubmit, validationElements.inactiveButtonClass)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(function () {
        changeButtonText(popupAvatarSubmit, 'Сохранить');
    })
}

function addNewCard (evt) {
    evt.preventDefault();
    changeButtonText(popupCardSubmit, 'Сохранине...');
    publishCard(cardPlaceName.value, cardImageLink.value)
    .then((data) => {
        addCard(renderCard(data, profileData.id))
        hidePopup(popupCard);
        popupCardForm.reset();
        disableButton(popupCardSubmit, validationElements.inactiveButtonClass)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(function () {
        changeButtonText(popupCardSubmit, 'Сохранить');
    })
}

profileEditButton.addEventListener('click', handleEditProfile);
profileAvatarEditButton.addEventListener('click', handleEditProfileAvatar);
cardAddButton.addEventListener('click', handleNewCard);

profileSubmit.addEventListener('submit', editProfileData);
popupAvatarSubmit.addEventListener('submit', editAvatarPic);
popupCardSubmit.addEventListener('submit', addNewCard);

profileCloseButton.addEventListener('click', function() {
    hidePopup(popupProfile);
});

popupCardCloseButton.addEventListener('click', function() {
    hidePopup(popupCard);
});

popupAvatarCloseButton.addEventListener('click', function() {
    hidePopup(popupAvatar);
});

popupImageCloseButton.addEventListener('click', function() {
    hidePopup(popupImage);
});

enableValidation(validationElements);