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
  run(
    @UploadedFiles() {code1: code1Array, code2: code2Array}: {  code1: [Express.Multer.File], code2: [Express.Multer.File]},
  ): Promise<[string, string]> {
    const [code1] = code1Array;
    const [code2] = code2Array;
    return this.encounterService.run(code1.filename, code2.filename);
  }
}
