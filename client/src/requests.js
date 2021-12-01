const baseUrl = 'http://localhost:3000/api/v1';

export const User = {
  current() {
    return fetch(`${baseUrl}/users/current`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  create(params) {
    return fetch(`${baseUrl}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: params }),
    }).then((res) => res.json());
  },
};

export const Session = {
  create(params) {
    return fetch(`${baseUrl}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  destroy() {
    return fetch(`${baseUrl}/session`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res.json());
  },
};
