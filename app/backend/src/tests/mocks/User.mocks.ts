const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const hashedPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

const existingUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: validEmail,
  password: hashedPassword
}

const validLoginBody = {
  email: validEmail,
  password: validPassword,
}

const missingEmail = {
  email: '',
  password: validPassword,
}

const missingPassword = {
  email: validEmail,
  password: ''
}

const invalidEmail = {
  email: 'bobo',
  password: validPassword,
}

const invalidPassword = {
  email: validEmail,
  password: 'banana',
}

export default {
  existingUser,
  validLoginBody,
  missingEmail,
  missingPassword,
  invalidEmail,
  invalidPassword,
}
