// apps/api/src/exams/exams.module.ts
import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminsController } from './admins.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}