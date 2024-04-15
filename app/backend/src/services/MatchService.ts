import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private _MatchModel: IMatchModel = new MatchModel(),
  ) { }

  async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._MatchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async getFilteredMatches(queryStr: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._MatchModel.findAll();

    if (queryStr === 'true') {
      const filteredMatches = allMatches.filter(({ inProgress }) => inProgress === true);
      return { status: 'SUCCESSFUL', data: filteredMatches };
    }
    if (queryStr === 'false') {
      const filteredMatches = allMatches.filter(({ inProgress }) => inProgress === false);
      return { status: 'SUCCESSFUL', data: filteredMatches };
    }

    return { status: 'NOT_FOUND', data: { message: 'No match found for your filter' } };
  }

  async endMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const modelReturn = await this._MatchModel.finish(id);

    if (!modelReturn) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceMessage>> {
    const modelReturn = await this._MatchModel.updateGoals(id, homeTeamGoals, awayTeamGoals);

    if (!modelReturn) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
