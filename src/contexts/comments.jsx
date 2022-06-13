import React from 'react';

export const CommentsContext = React.createContext({
  comments: [],
  setComments: () => []
})

export const UserContext = React.createContext({
  user: {},
  setUser: () => { }
})