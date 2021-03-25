const API_URL = 'https://dokanee-backend-monolithic.herokuapp.com/'
    const LOGIN_URL = API_URL + 'auth/signin/'
    const SIGNUP_URL = API_URL + 'auth/signup'
    
    const optionsJson = {
        headers: {
            'Content-Type': 'application/json',
        }
      };
  export default{
      optJson: optionsJson,
    apiUrl: API_URL,
    loginUrl: LOGIN_URL,
    signUpUrl: SIGNUP_URL
    
  }