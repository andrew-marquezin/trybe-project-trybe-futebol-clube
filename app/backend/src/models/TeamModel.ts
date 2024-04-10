import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private _model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbReturn = await this._model.findAll();
    const data = dbReturn.map(({ id, teamName }) => ({ id, teamName }));
    return data;
  }
}
