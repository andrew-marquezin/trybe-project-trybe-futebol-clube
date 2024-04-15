import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  finish(id: number): Promise<'OK' | 'NOK'>,
}
