// apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './exams/exams.module';
import { UploadModule } from './upload/upload.module';
import { AdminAuthModule } from './auth/admin-auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { QuestionsModule } from './questions/questions.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    PrismaModule,
    ExamsModule,
    AdminsModule,
    UploadModule,
    UserModule,
    AuthModule,
    AdminAuthModule,
    SubjectsModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}