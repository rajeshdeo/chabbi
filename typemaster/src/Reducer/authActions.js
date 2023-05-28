export const login = (credentials) => ({
    type: 'LOGIN',
    payload: credentials,
  });
  
  export const signup = (userData) => ({
    type: 'SIGNUP',
    payload: userData,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });