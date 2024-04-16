import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import ILeaderboard from '../Interfaces/ILeaderboard';

export default class LeaderboardService extends MatchModel {
  static win(home: number, away: number) {
    if (home > away) return 1;
    return 0;
  }

  static loss(home: number, away: number) {
    if (home < away) return 1;
    return 0;
  }

  static draw(home: number, away: number) {
    if (home === away) return 1;
    return 0;
  }

  static totalPoints(home: number, away: number) {
    if (LeaderboardService.win(home, away) === 1) return 3;
    if (LeaderboardService.draw(home, away) === 1) return 1;
    return 0;
  }

  static createTeam(match: IMatch) {
    return {
      name: match.homeTeam?.teamName,
      totalPoints: LeaderboardService.totalPoints(match.homeTeamGoals, match.awayTeamGoals),
      totalGames: 1,
      totalVictories: LeaderboardService.win(match.homeTeamGoals, match.awayTeamGoals),
      totalDraws: LeaderboardService.draw(match.homeTeamGoals, match.awayTeamGoals),
      totalLosses: LeaderboardService.loss(match.homeTeamGoals, match.awayTeamGoals),
      goalsFavor: match.homeTeamGoals,
      goalsOwn: match.awayTeamGoals,
    };
  }

  async leaderboard() {
    const matches = await this.findAll({ inProgress: false });
    const board: ILeaderboard[] = [];

    matches.forEach((match) => {
      const currTeam = board.findIndex((t) => t.name === match.homeTeam?.teamName);
      if (currTeam !== -1) {
        const ediTeam = board[currTeam];
        ediTeam.totalPoints += LeaderboardService
          .totalPoints(match.homeTeamGoals, match.awayTeamGoals);
        ediTeam.totalGames += 1;
        ediTeam.totalVictories += LeaderboardService.win(match.homeTeamGoals, match.awayTeamGoals);
        ediTeam.totalDraws += LeaderboardService.draw(match.homeTeamGoals, match.awayTeamGoals);
        ediTeam.totalLosses += LeaderboardService.loss(match.homeTeamGoals, match.awayTeamGoals);
        ediTeam.goalsFavor += match.homeTeamGoals;
        ediTeam.goalsOwn += match.awayTeamGoals;
      } else { board.push(LeaderboardService.createTeam(match)); }
    });

    return board;
  }
}
