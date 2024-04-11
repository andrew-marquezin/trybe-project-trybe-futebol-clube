import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'
import { team, teams } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { app } = new App()
const { expect } = chai;

describe('Teams tests', function() {
  it('should list all the teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a specific team by id', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  afterEach(sinon.restore);
});