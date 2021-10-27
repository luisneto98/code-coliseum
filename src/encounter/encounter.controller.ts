import { GameLogSchema } from './../database/schemas/game-log.schema';
import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { HashService } from '../games/hash.service';

@Controller('/encounter')
export class EncounterController {
  constructor(
    private readonly encounterService: HashService,
    @InjectModel('gameLog') private gameLogModel: Model<any>
    ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'code1', maxCount: 1 },
    { name: 'code2', maxCount: 1 },
  ]))
  async run(
    @UploadedFiles() {code1: code1Array, code2: code2Array}: {  code1: [Express.Multer.File], code2: [Express.Multer.File]},
  ): Promise<any> {
    const [code1] = code1Array;
    const [code2] = code2Array;
    
    const gameOne = await this.encounterService.run(code1.filename, code2.filename);
    const gameTwo = await this.encounterService.run(code1.filename, code2.filename, '2');
    
    const result = {'1': 0, '2': 0};
    result[gameOne.victory] += 1;
    result[gameTwo.victory] += 1;

    const victory = result['1'] === 2 ? '1' : result['1'] === 0 ? '2' : null;
    const response =  { '1': gameOne, '2': gameTwo, victory: victory}

    // save log
    await this.gameLogModel.create(response);
    return response;
  }
}
