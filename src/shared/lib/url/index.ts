export type UrlParamsType = {
    [key: string]: (string | number)[] | boolean | number;
};

/**
 * Get boolean after checking encoded params
 * @param {string} str - url search params
 * @returns {boolean} - is str has encoded char
 */
export const hasEncodedCharacters = (str: string): boolean => {
  const encodedRegex = /%[0-9A-Fa-f]{2}/g;
  return encodedRegex.test(str);
};

/**
 * Parse url params and return object
 * @param {string} searchParams - router search param
 * @return {object} - url params
 */
export const getUrlParams = (searchParams?: string): UrlParamsType => {
  let getParams: string[];
  try {
    if (hasEncodedCharacters(searchParams || window.location.search)) {
      getParams = decodeURI(searchParams || window.location.search)
        .slice(1)
        .split('&');
    } else {
      getParams = (searchParams || window.location.search).slice(1).split('&');
    }
  } catch (error) {
    getParams = [];
  }
  const params: {[key: string]: string[]} = {};

  getParams.forEach((item: string) => {
    const arr = item.split('=');
    if (arr.length < 2) return;
    params[arr[0]] = arr[1].split(',');
  });

  return params;
};

/**
 * Parse url params and return object
 * @param {string} item Current name
 * @param {string} routerUrlParams - router url params
 * @return {string} - url param
 */
export const getUrlParameter = (item: string, routerUrlParams?: string): string => {
  const name = item.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(
    typeof routerUrlParams === 'undefined' ? window.location.search : routerUrlParams,
  );

  if (!results) return '';

  const isEncoded = hasEncodedCharacters(results[1]);
  if (isEncoded) {
    return decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  return results[1].replace(/\+/g, ' ');
};
