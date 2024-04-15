import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  finish(id: number): Promise<'OK' | null>,
  updateGoals(id: number, homeGoals: number, awayGoals: number): Promise<'OK' | null>,
}
