const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
    headers: {
        authorization: 'ab7c328c-05fc-438f-b52b-81143bcac0cd',
        'Content-Type': 'application/json'
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        return handleResponse(res);
    });
}

export const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        return handleResponse(res);
    });
}

export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        return handleResponse(res);
    });
}

export const publishCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        return handleResponse(res);
    });
}

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then (res => {
        return handleResponse(res);
    });
}

export const likeCard = (action, id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: action,
        headers: config.headers
    })
    .then (res => {
        return handleResponse(res);
    });
}

export const editAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then (res => {
        return handleResponse(res);
    });
}