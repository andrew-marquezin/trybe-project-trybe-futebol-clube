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

export default {
  existingUser,
  validLoginBody,
}
