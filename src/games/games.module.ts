import { Module } from '@nestjs/common';
import { CodeRunnerModule } from 'src/code-runner/code-runner.module';
import { HashService } from './hash.service';

@Module({
  imports: [
    CodeRunnerModule,
  ],
  providers: [HashService],
  exports: [HashService]
})
export class GamesModule {}
