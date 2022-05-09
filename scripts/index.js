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
const cardTemplate = document.querySelector('#card-template').content;
const imagePopupImage = popupImage.querySelector('.popup__image');
const cardPlaceName = popupCard.querySelector('input[name=new-card-name]');
const cardImageLink = popupCard.querySelector('input[name=new-card-link]');
const cardFormArea = popupCard.querySelector('.popup__form');
const profileFormArea = popupProfile.querySelector('.popup__form');
const imagePopupImageCaption = popupImage.querySelector('.popup__caption');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];   

function showPopup(popup) {
    popup.classList.add('popup_opened');
}

function hidePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    hidePopup(popupProfile);
}

function showPopupImage(caption, link) {
    imagePopupImage.src = link;
    imagePopupImage.alt = caption;
    imagePopupImageCaption.textContent = caption;
    showPopup(popupImage);
}

function newCard(cardName, cardLink) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = cardName;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardImage.addEventListener('click', function(evt) {
        showPopupImage(cardName, cardLink);
    });
    
    card
        .querySelector('.card__icon')
        .addEventListener('click', function(evt) {
            evt.target.classList.toggle('card__icon_active');
        });

    card
        .querySelector('.card__delete-icon')
        .addEventListener('click', function(evt) {
            card.remove();
        });
    return card;
}

function addCard(cardName, cardLink) {
    const card = newCard(cardName, cardLink);
    cardsArea.prepend(card);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(cardPlaceName.value, cardImageLink.value);
    cardFormArea.reset();
    hidePopup(popupCard);
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
})

popupCardCloseButton.addEventListener('click', function () {
    hidePopup(popupCard);
})

popupImageCloseButton.addEventListener('click', function () {
    hidePopup(popupImage);
})

cardFormArea.addEventListener('submit', handleCardFormSubmit);
profileFormArea.addEventListener('submit', handleProfileFormSubmit);

initialCards.forEach(function (card) {
    addCard(card.name, card.link);
});
