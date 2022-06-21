import { showPopupImage } from './index.js';
export const cardTemplate = document.querySelector('#card-template').content;

function toggleLike (evt) {
    evt.target.classList.toggle('card__icon_active')
};

function deleteCard (evt) {
    evt.target.closest('.card').remove();
}

export function createCard(cardName, cardLink) {
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
        .addEventListener('click', toggleLike);

    card
        .querySelector('.card__delete-icon')
        .addEventListener('click', deleteCard);
    return card;
};

