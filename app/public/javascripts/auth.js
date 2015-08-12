var localStorage = window.localStorage

  function login() {
    localStorage.token = Math.random().toString(36).substring(7)
  }

  function getToken() {
    return localStorage.token;
  }

  function logout() {
    console.log('before delete:' +localStorage.token)
    delete localStorage.token;
    console.log('after delete:' +localStorage.token)
    console.log('logout')
    this.onChange(false);
  }

  function loggedIn() {
    return !!localStorage.token;
  }


  exports.login = login;
  exports.getToken = getToken;
  exports.logout = logout;
  exports.loggedIn = loggedIn;

