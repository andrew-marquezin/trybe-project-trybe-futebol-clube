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

  afterEach(sinon.restore);
});