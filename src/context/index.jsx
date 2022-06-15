import React from 'react';

export const CurrentUserContext = React.createContext({
  currentUser: {},
});

export const CommentsContext = React.createContext({
  comments: [],
  setComments: () => [],
});
