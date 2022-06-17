import React from 'react';

export const CurrentUserContext = React.createContext({
  currentUser: {},
  setCurrentUser: () => {},
});

export const CommentsContext = React.createContext({
  comments: [],
  setComments: () => [],
});
