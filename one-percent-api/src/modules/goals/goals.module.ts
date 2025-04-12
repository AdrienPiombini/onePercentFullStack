import { Module } from '@nestjs/common';

import { CreateGoalUsecase } from './usecases/CreateGoalUsecase';
import { GoalController } from './api/GoalsController';

import { GetAllGoalsUsecase } from './usecases/GetAllGoalsUsecase';

import { MongooseModule } from '@nestjs/mongoose';
import { Goal } from 'src/core/domain/Goal';

import { GoalMysqlEntity } from './db/Mysql/GoalMysqlEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalSchema } from './db/MongoDb/GoalMongoEntity';
import { GoalMongoRepository } from './db/MongoDb/GoalMongoRepository';

@Module({
  controllers: [GoalController],
  providers: [
    CreateGoalUsecase,
    GetAllGoalsUsecase,
    {
      provide: 'GoalRepository',
      useClass: GoalMongoRepository,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([GoalMysqlEntity]),
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
  ],
})
export class GoalModule {}
