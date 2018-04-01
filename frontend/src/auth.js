import parseOneAddress from 'email-addresses';

const currentTime = Date.now();
if (localStorage.token) {
  const { token } = localStorage;
  if (token.expiresAt < currentTime) {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }
}

const auth = {
  profile: localStorage.profile ? JSON.parse(localStorage.profile) : null,
  token: localStorage.token ? JSON.parse(localStorage.token) : null,
  valid: true,
  authenticate(response) {
    const token = response.tokenObj;
    const profile = response.profileObj;
    const { email } = profile;
    const emailAst = parseOneAddress(email);
    const emailAddress = emailAst.addresses[0];
    const { domain } = emailAddress;
    const isValid = domain === 'whitman.edu';
    if (isValid) {
      auth.profile = profile;
      auth.token = token;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  },
  signout(response) {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    auth.profile = null;
  },
};

export default auth;
