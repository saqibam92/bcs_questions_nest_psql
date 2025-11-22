// apps/api/src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/auth.controller'; // Use our existing auth guard
import { UploadService } from './upload.service';

@UseGuards(JwtAuthGuard) // Secure all upload routes
@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Route for bulk uploading new exams.
   * Expects a CSV file.
   */
  @Post('exams')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUploadExams(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('Invalid file type. Please upload a CSV.');
    }
    return this.uploadService.bulkUploadExams(file);
  }

  /**
   * Route for uploading questions for an existing exam.
   * Expects a CSV file.
   */
  @Post('questions/:examId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadQuestionsForExam(
    @Param('examId') examId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('Invalid file type. Please upload a CSV.');
    }
    return this.uploadService.uploadQuestionsForExam(examId, file);
  }
}