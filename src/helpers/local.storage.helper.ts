export default class Storage {
  static setItem(key: string) {}
}
export const LOGIN_TOKEN_KEY = 'token';
const USER_NAME_KEY = 'name';
export const LOGOUT_REDIRECT_URL = 'logout_redirect_url';

export const setUserNameInStorage = function(name: string) {
  return localStorage.setItem(USER_NAME_KEY, name);
};

export const getUserNameFromStorage = function() {
  return localStorage.getItem(USER_NAME_KEY);
};

export const isLogin = function() {
  const token = localStorage.getItem(LOGIN_TOKEN_KEY);
  return !!token;
};

export const removeTokensOnLogout = function() {
  localStorage.removeItem(LOGIN_TOKEN_KEY);
};

export const setLogoutRedirectUrl = (url: string) => {
  localStorage.setItem(LOGOUT_REDIRECT_URL, url);
};

export const getLogoutRedirectUrl = () => {
  return localStorage.getItem(LOGOUT_REDIRECT_URL);
};
