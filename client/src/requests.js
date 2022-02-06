const baseUrl = 'http://money-4-life.herokuapp.com/api/v1';

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

export const Budget = {
  index() {
    return fetch(`${baseUrl}/budgets`).then((res) => res.json());
  },
  indexQuery(query) {
    return fetch(`${baseUrl}/budgets?${query}`).then((res) => res.json());
  },
  create(params) {
    return fetch(`${baseUrl}/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  update(params, bid) {
    return fetch(`${baseUrl}/budgets/${bid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  destroy(bid) {
    return fetch(`${baseUrl}/budgets/${bid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const Transaction = {
  index() {
    return fetch(`${baseUrl}/transactions`).then((res) => res.json());
  },
  indexQuery(query) {
    return fetch(`${baseUrl}/transactions?${query}`).then((res) => res.json());
  },
  create(params) {
    return fetch(`${baseUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  update(params, tid) {
    return fetch(`${baseUrl}/transactions/${tid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  destroy(tid) {
    return fetch(`${baseUrl}/transactions/${tid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const Subscription = {
  index() {
    return fetch(`${baseUrl}/subscriptions`).then((res) => res.json());
  },
  indexQuery(query) {
    return fetch(`${baseUrl}/subscriptions?${query}`).then((res) => res.json());
  },
  update(params, sid) {
    return fetch(`${baseUrl}/subscriptions/${sid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  destroy(sid) {
    return fetch(`${baseUrl}/subscriptions/${sid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res.json());
  },
};
