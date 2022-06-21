function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        hidePopup(document.querySelector('.popup_opened'));
    }
}

function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
        hidePopup(document.querySelector('.popup_opened'));
    }
}

export function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEsc);
    document.addEventListener('click', closeOnOverlay);
}

export function hidePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEsc);
    document.removeEventListener('click', closeOnOverlay);
}
