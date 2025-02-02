import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private _TeamModel: ITeamModel = new TeamModel(),
  ) { }

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this._TeamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this._TeamModel.findById(id);
    if (team) return { status: 'SUCCESSFUL', data: team };
    return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
  }
}
