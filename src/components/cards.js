import { showPopup } from './modal.js';
import { deleteCard, likeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
export const popupImage = document.querySelector('.js-popup-image');
const imagePopupImage = popupImage.querySelector('.popup__image');
const imagePopupImageCaption = popupImage.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.photo-grid');

function toggleLike (evt) {
    evt.target.classList.toggle('card__icon_active')
};

function removeCard (evt) {
    evt.target.closest('.card').remove();
}

export function addCard (card) {
    cardsContainer.prepend(card);
}

function showAmountOfLikes (likesData, likeCounter) {
    likeCounter.textContent = likesData.length;
}

function setLikeAction (likesData, profileId) {
    let action = 'PUT';
    likesData.forEach((element) => {
        if (element._id === profileId) {
            action = 'DELETE';
        }
    })
    return action;
}

function setLikeButtonStatus (likesData, profileId, likeButton) {
    let likedByMe = false;
    likesData.some((element) => {
        if(element._id === profileId) {
            likedByMe = true;
        }
    })
    if (likedByMe) {
        toggleLike(likeButton)
    }
}

export function renderCard (cardData, profileId) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const likeCounter = card.querySelector('.card__like-counter');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-icon');
    const likeButton = card.querySelector('.card__icon');
    let allLikes = cardData.likes;

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    showAmountOfLikes(allLikes, likeCounter);
    setLikeButtonState(allLikes, profileId, likeButton);

    likeButton.addEventListener('click', function(evt) {
        const action = setLikeAction(allLikes, profileId);
        likeCard(action, cardData._id)
        .then((data) => {
            allLikes = data.likes;
            showAmountOfLikes(allLikes, likeCounter);
            setLikeButtonStatus(allLikes, profileId, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    });

    if (profileId === cardData.owner._id) {
        deleteButton.addEventListener('click', function(evt) {
            deleteCard(cardData._id)
            .then(() => {
                removeCard(evt);
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }

        else {
            deleteButton.classList.add('card__delete-icon_satus_hidden');
        }

    cardImage.addEventListener('click', function() {
        showPopup(popupImage);
        imagePopupImage.src = cardData.link;
        imagePopupImage.alt = cardData.name;
        imagePopupImageCaption.textContent = cardData.name;
    })
    return card;
}