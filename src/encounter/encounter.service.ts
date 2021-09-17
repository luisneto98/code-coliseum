import { HashService } from './../games/hash.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncounterService {
  constructor(private readonly hashGameService: HashService) {}

  async run(code1: string, code2: string): Promise<[string, string]> {
    return this.hashGameService.run(code1, code2);
  }
}
