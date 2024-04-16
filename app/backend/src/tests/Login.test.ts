import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser'
import UserMocks from './mocks/User.mocks';

chai.use(chaiHttp);

const { app } = new App()
const { expect } = chai;

describe('Login tests', function() {
  it('with valid data, should return a token', async function () {
    const requestBody = UserMocks.validLoginBody;
    const mockFindOneReturn = SequelizeUser.build(UserMocks.existingUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
  });

  it('with invalid email, should return an error', async function () {
    const requestBody = UserMocks.invalidEmail;
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" })
  });

  it('with invalid password, should return an error', async function () {
    const requestBody = UserMocks.invalidPassword;
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" })
  });

  it('with no email, should return an error', async function () {
    const requestBody = UserMocks.missingEmail;

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: "All fields must be filled" })
  });

  it('with no password, should return an error', async function () {
    const requestBody = UserMocks.missingPassword;

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: "All fields must be filled" })
  });

  afterEach(sinon.restore);
});