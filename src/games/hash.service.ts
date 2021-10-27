import { CodeRunnerService } from '../code-runner/code-runner.service';
import { flatten, Injectable } from '@nestjs/common';

const hashPosiMap = {
  '1': { i: 0, j: 0 },
  '2': { i: 0, j: 1 },
  '3': { i: 0, j: 2 },
  '4': { i: 1, j: 0 },
  '5': { i: 1, j: 1 },
  '6': { i: 1, j: 2 },
  '7': { i: 2, j: 0 },
  '8': { i: 2, j: 1 },
  '9': { i: 2, j: 2 },
};

@Injectable()
export class HashService {
  constructor(private readonly codeRunnerService: CodeRunnerService) {}

  async run(code1: string, code2: string, startCode: '1' | '2'= '1'): Promise<any> {
    const hash = [
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];
    let victory: string = null;
    let turnPlayer: '1' | '2' = startCode;
    let gameJson = {};

    for (let i = 0; i < 9; i++) {
      const codeMove = await this.codeRunnerService.runCode(
        turnPlayer == '1' ? code1 : code2,
        turnPlayer == '1'
          ? flatten(hash)
          : this.convertArrayToCode2(flatten(hash)),
      );

      const move = this.checkValidPosition(hash, codeMove);
      const posiObj = hashPosiMap[move];
      hash[posiObj.i][posiObj.j] = turnPlayer;

      gameJson = {
        ...gameJson,
        [i]: { turn: i, player: turnPlayer, move, codeMove },
      };

      victory = this.checkVictory(hash);
      if (victory) break;
      turnPlayer = turnPlayer == '1' ? '2' : '1';
    }

    return { turns: gameJson, victory };
  }

  convertArrayToCode2(arr: string[]): string[] {
    return arr.map(item => {
      if (item == '1') return '2';
      if (item == '2') return '1';
      return item;
    });
  }

  checkValidPosition(hash: string[][], value: string): string {
    if (
      Object.keys(hashPosiMap).includes(value) &&
      hash[hashPosiMap[value].i][hashPosiMap[value].j] == '0'
    )
      return value;
    return Object.keys(hashPosiMap).find(
      p => hash[hashPosiMap[p].i][hashPosiMap[p].j] == '0',
    );
  }

  checkVictory(hash: string[][]): string {
    let victory: string = null;

    victory =
      victory ||
      ([0, 1, 2].reduce(
        (acc, ln) => acc || this.checkVictoryInLine(hash, ln),
        null,
      ) as string);
    victory =
      victory ||
      ([0, 1, 2].reduce(
        (acc, ln) => acc || this.checkVictoryInCol(hash, ln),
        null,
      ) as string);
    victory = victory || this.checkVictoryInLeftDiag(hash);
    victory = victory || this.checkVictoryInRigthDiag(hash);
    return victory;
  }

  checkVictoryInLine(hash: string[][], line: number): string {
    if (hash[line][0] == '0') return null;
    return hash[line][0] == hash[line][1] && hash[line][0] == hash[line][2]
      ? hash[line][0]
      : null;
  }

  checkVictoryInCol(hash: string[][], col: number): string {
    if (hash[0][col] == '0') return null;
    return hash[0][col] == hash[1][col] && hash[0][col] == hash[2][col]
      ? hash[0][col]
      : null;
  }

  checkVictoryInLeftDiag(hash: string[][]): string {
    if (hash[0][0] == '0') return null;
    return hash[0][0] == hash[1][1] && hash[0][0] == hash[2][2]
      ? hash[0][0]
      : null;
  }

  checkVictoryInRigthDiag(hash: string[][]): string {
    if (hash[0][2] == '0') return null;
    return hash[0][2] == hash[1][1] && hash[0][2] == hash[2][0]
      ? hash[0][2]
      : null;
  }
}
