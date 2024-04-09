import ITeam from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  // create(data: Partial<ITeam>): Promise<ITeam>,
}
