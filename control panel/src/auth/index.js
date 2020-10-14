import {rt} from '../router/index.js'
import axios from 'axios'

// URL and endpoint constants
const API_URL = 'https://dokanee-backend-monolithic.herokuapp.com/'
const LOGIN_URL = API_URL + 'auth/signin/'
const SIGNUP_URL = API_URL + 'auth/signup'

const options = {
  headers: {
      'Content-Type': 'application/json',
  }
};

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(data, redirect, f) {
    axios.post(LOGIN_URL, data)
    .then(response => {
      console.log(response)
      localStorage.setItem('id_token', response.id_token)
      localStorage.setItem('access_token', response.data.accessToken)
    
      this.user.authenticated = true
      console.log(localStorage)

      // Redirect to a specified route
      if(f == 0) {
        window.location.href = redirect;    
      }
    })
    .catch(err => {
      return false;
    });
     
  },
 
  signup(data,  redirect) {
    console.log(data);
    axios.post(SIGNUP_URL, data, options)
    .then(response => {
      console.log(response)
      if(response.data.massage == "Email Already Exists") return "ExMail";
      localStorage.setItem('id_token', response.id_token)
      localStorage.setItem('access_token', response.data.accessToken)
      // this.user.authenticated = true
      // console.log(localStorage)

      if(redirect) {
        rt.go(redirect)        
      }
    })
    .catch(err => console.log(err));
     
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}