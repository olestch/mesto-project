const cardTemplate = document.querySelector('#card-template').content;
import { showPopupImage } from './index.js';

import antalya from '../images/antalya.jpg';
import fyord from '../images/Geiranger_Fjord.jpg';
import kiso from '../images/kiso.jpg';
import mars from '../images/Mars.jpg';
import spb from '../images/Sankt-Peterburg.jpg';
import texas from '../images/Texas.jpg';

export const initialCards = [
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

export function newCard(cardName, cardLink) {
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

