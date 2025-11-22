// apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './exams/exams.module';
import { UploadModule } from './upload/upload.module';

// Import the new modules you created
import { AdminAuthModule } from './auth/admin-auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { QuestionsModule } from './questions/questions.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; // This is the old user auth

@Module({
  imports: [
    PrismaModule,
    ExamsModule,
    UploadModule,
    UserModule,
    AuthModule, // For existing user/mobile auth

    // Add these lines to register your new modules
    AdminAuthModule,
    SubjectsModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}