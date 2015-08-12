module.exports = {
  login(username, pass){
    if (localStorage.token){
      this.onChange(true)
      return;
    }
  },
  getToken: function(){
    return localStorage.token;
  },
  logout: function(cd){
    delete localStorage.token;
    this.onChange(false);
  },
  loggedIn: function(){
    console.log('in login')
    console.log(localStorage.token)
    return !!localStorage.token;
  },
  onChange: function(){}
};
