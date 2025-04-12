import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalModule } from './modules/goals/goals.module';
import { TaskModule } from './modules/tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { mysqlProvider } from './db/mysql.provider';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoalModule,
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot(mysqlProvider),
    // MongooseModule.forRootAsync(mongoDbProviderAsync),

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
