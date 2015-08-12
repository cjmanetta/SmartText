var localstorage = window.localStorage

  function login(email, password) {
    if (localStorage.token) {
      this.onChange(true);
      return;
    }
    logInRequest()
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

  function onChange() {}

  function logInRequest() {
    setTimeout(() => {
      localstorage.token = Math.random().toString(36).substring(7)
      console.log('login token:'+localstorage.token)
    }, 0);
  }

  exports.login = login;
  exports.getToken = getToken;
  exports.logout = logout;
  exports.loggedIn = loggedIn;
  exports.onChange = onChange;
  exports.logInRequest = logInRequest;
