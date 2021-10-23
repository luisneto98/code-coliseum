import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { HashService } from '../games/hash.service';

@Controller('/encounter')
export class EncounterController {
  constructor(private readonly encounterService: HashService) {}

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
    return { '1': gameOne, '2': gameTwo, victory: victory}
  }
}
