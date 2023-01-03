function setCookie(name, value, exdays) {
  const d = new Date();
  // d.setTime(d.getTime() + 5000);
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = `${name}="";expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const equalSign = cookie.indexOf("=");
    const name = equalSign > -1 ? cookie.substring(0, equalSign) : cookie;
    document.cookie = `${name}="";expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }
}

export { setCookie, getCookie, deleteCookie, deleteAllCookies };
