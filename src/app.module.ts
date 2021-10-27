import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncounterModule } from './encounter/encounter.module';
@Module({
  imports: [EncounterModule, MongooseModule.forRoot(process.env.DATABASE)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
