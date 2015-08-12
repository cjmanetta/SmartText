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
    return !!localStorage.token;
  },
  onChange: function(){}
};
