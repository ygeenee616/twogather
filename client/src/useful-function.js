export const setCookie = (key, value) => {
  let newCookie =
    encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";path=/";
  document.cookie = newCookie;
};

export const getCookie = (cookieName) => {
  // const decodedCookieName = decodeURIComponent(cookieName);
  // const idx = document.cookie.indexOf(decodedCookieName);
  const idx = document.cookie.indexOf(cookieName);

  if (idx === -1) {
    return null;
  } else {
    const cookieValue = document.cookie
      .slice(idx)
      .split(";")
      .find((row) => row.startsWith(cookieName))
      .split("=")[1];

    return cookieValue;
  }
};

export const deleteCookie = (cookieName) => {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
};
