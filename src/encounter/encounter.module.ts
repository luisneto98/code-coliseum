import { GameLogSchema } from './../database/schemas/game-log.schema';
import { GamesModule } from './../games/games.module';
import { diskStorage } from 'multer';
import { EncounterController } from './encounter.controller';
import { Module } from '@nestjs/common';
import { EncounterService } from './encounter.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GamesModule,
    MongooseModule.forFeature([
      { name: 'gameLog', schema: GameLogSchema, collection: 'gameLog' },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: function(req, file, cb) {
          cb(null, 'tmp/');
        },
        filename: function(req, file, cb) {
          const uniqueSuffix = Date.now() + '.py';
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  ],
  controllers: [EncounterController],
  providers: [EncounterService],
})
export class EncounterModule {}
