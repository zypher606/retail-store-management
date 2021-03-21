import axios from 'axios';
import { BASE_URL } from '../constants/config.constant';
import {
  LOGOUT_REDIRECT_URL,
  getLogoutRedirectUrl,
  removeTokensOnLogout,
} from './local.storage.helper';
import { API_STATE } from '../stores/apiReducer';
// import {
//   getConcept,
//   logoutConcurrentSession,
// } from 'app/helpers/private.api.helper';
import debounce from './debounce.helper';

/**
 *
 * @param listingData {data: [], filter: {key, value}}
 */

interface color {
  [key: string]: string;
}

export interface IListObj {
  apiState: number;
  data: any[];
  error?: string;
}

export function getSearchedData(
  data: any,
  searchKey: string | string[],
  searchText: string,
) {
  let finalData: any[] = [];
  finalData = filterData({
    data,
    filter: { key: searchKey, value: searchText },
  });
  // finalData = sortProficiencyFunction(finalData);
  return finalData;
}

export function filterData(listingData: any) {
  const { data = [], filter = {} } = listingData;
  const { key, value } = filter;
  const regexValue = new RegExp(value, 'i');
  const filteredData = data.filter((el: any) => {
    const val = typeof key === 'string' ? el[key] : get(key, el);
    return regexValue.exec(val);
  });
  return filteredData;
}

export function get(path: string[], obj: { [key: string]: any }) {
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function isEquivalent(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1 = [...arr1].sort();
  arr2 = [...arr2].sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export function titleCase(str: string) {
  if (!str) {
    return '';
  }
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function combineField(arr: any[], key: string, seperator = ',') {
  const extractedKeys = arr.map(obj => obj[key]);
  return extractedKeys.join(seperator);
}

const colorList: color = {
  a: '#ffbc58',
  b: '#420420',
  c: '#bada55',
  d: '#002060',
  e: '#d3ffce',
  f: '#b6fcd5',
  g: '#b4eeb4',
  h: '#a0db8e',
  i: '#00ff00',
  j: '#7f00ff',
  k: '#d4af37',
  l: '#094276',
  m: '#505c5e',
  n: '#000000',
  o: '#317256',
  p: '#FFE3E3',
  q: '#99cccc',
  r: '#954bff',
  s: '#D1EAFF',
  t: '#d9a0c6',
  u: '#d0a0d9',
  v: '#a9d9a0',
  w: '#024500',
  x: '#301d12',
  y: '#596e78',
  z: '#a8d3ee',
};

export const getColorCode = (color: string) => colorList[color];

export function sortProficiencyFunction(list: any[]) {
  return list.sort((item1: any, item2: any) => {
    if (item1.proficiency === 'NA') {
      return -1;
    } else {
      return (
        item1.proficiency.replace(/[%]/g, '') -
        item2.proficiency.replace(/[%]/g, '')
      );
    }
  });
}

export const API_REQUEST_TIMEOUT = 30000;

// creating axios instance
export const publicAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_REQUEST_TIMEOUT,
});
export const createPrivateAxiosInstance = function(
  baseURL = BASE_URL,
) {
  // TODO - add a way to skip this step in every call
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem(LOGIN_TOKEN_KEY),
    },
    timeout: API_REQUEST_TIMEOUT,
  });
};

export const isLoading = (state: number) => state === API_STATE.LOADING;

export const isApiFailed = (state: number) =>
  state === API_STATE.ERROR || state === API_STATE.FAILED;


function redirectOnSessionExpiry(message: string) {
  const redirectUrl = getLogoutRedirectUrl();
  if (redirectUrl) {
    //@ts-ignore
    window.location = `${redirectUrl}?redirected=true&error=${message}`;
  } else {
    window.location.assign(`/login?redirected=true&error=${message}`);
  }
  localStorage.removeItem(LOGOUT_REDIRECT_URL);
}

export const redirectOnSessionExpired = debounce(redirectOnSessionExpiry, 250);

export async function logout() {
  removeTokensOnLogout();
}

export async function logoutAndRedirectOnSessionExpiry(message: string) {
  await logout();
  redirectOnSessionExpired(message);
}

export function asyncDelay(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
// 
export function getFormattedDate(date: Date) {
  return `${date.getDate()} ${date.toLocaleString('default', {
    month: 'short',
  })} ${date.getFullYear()}`;
}

export function getFormattedTime(date: Date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}
