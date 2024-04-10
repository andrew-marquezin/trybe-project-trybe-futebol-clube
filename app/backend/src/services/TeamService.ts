import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private _TeamModel: ITeamModel = new TeamModel(),
  ) { }

  async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this._TeamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
