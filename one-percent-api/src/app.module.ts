import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalModule } from './modules/goals/goals.module';
import { TaskModule } from './modules/tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoURI } from './db/mongoose.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { mysqlProvider } from './db/mysql.provider';

@Module({
  imports: [
    GoalModule,
    TaskModule,
    TypeOrmModule.forRoot(mysqlProvider),
    MongooseModule.forRoot(mongoURI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
