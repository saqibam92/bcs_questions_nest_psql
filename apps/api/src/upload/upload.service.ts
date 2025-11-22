// apps/api/src/upload/upload.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  /**
   * Bulk Upload Exams
   * CSV Format: name,durationMinutes,totalMarks,passingMarks
   */
  async bulkUploadExams(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const examsToCreate: any[] = [];
    const stream = Readable.from(file.buffer.toString());

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          if (!row.name) {
            return; // Skip invalid rows
          }
          
          examsToCreate.push({
            name: row.name,
            slug: row.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(), // Generate basic slug
            durationMinutes: parseInt(row.durationMinutes) || 60,
            totalMarks: parseFloat(row.totalMarks) || 100,
            passingMarks: parseFloat(row.passingMarks) || 40,
            isPublished: false,
          });
        })
        .on('end', async () => {
          try {
            const result = await this.prisma.exam.createMany({
              data: examsToCreate,
              skipDuplicates: true,
            });
            resolve({ message: `${result.count} exams uploaded successfully.` });
          } catch (e) {
            reject(new BadRequestException(`Database error: ${e.message}`));
          }
        })
        .on('error', (e) => reject(new BadRequestException(e.message)));
    });
  }

  /**
   * Upload Questions for an Exam
   * Maps CSV 'subject' column -> ExamSection
   */
  async uploadQuestionsForExam(examId: string, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) throw new BadRequestException('Exam not found.');

    // Group questions by "subject" (which becomes Section Name)
    const questionsBySection: Map<string, any[]> = new Map();
    const stream = Readable.from(file.buffer.toString());

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          // Map old CSV headers to new Schema fields
          const sectionName = row.subject || "General";
          const questionText = row.ques || row.text;
          const correctOpt = row.correctAnswer || row.correctOption;

          if (!questionText || !correctOpt) return;

          if (!questionsBySection.has(sectionName)) {
            questionsBySection.set(sectionName, []);
          }

          questionsBySection.get(sectionName).push({
            text: questionText,
            optionA: row.option_1 || row.optionA,
            optionB: row.option_2 || row.optionB,
            optionC: row.option_3 || row.optionC,
            optionD: row.option_4 || row.optionD,
            correctOption: this.normalizeCorrectOption(correctOpt),
            explanation: row.explanation || null,
            order: parseInt(row.ques_no || row.order || '0'),
            marks: parseFloat(row.marks || '1'),
          });
        })
        .on('end', async () => {
          try {
            const transactionPromises = [];
            let totalQuestions = 0;

            for (const [sectionName, questions] of questionsBySection.entries()) {
              // Create Section -> Create Questions
              const sectionPromise = this.prisma.examSection.create({
                data: {
                  examId: examId,
                  name: sectionName,
                  questions: {
                    createMany: {
                      data: questions
                    }
                  }
                }
              });
              transactionPromises.push(sectionPromise);
              totalQuestions += questions.length;
            }

            await this.prisma.$transaction(transactionPromises);
            resolve({ message: `Uploaded ${totalQuestions} questions into ${questionsBySection.size} sections.` });
          } catch (e) {
            console.error(e);
            reject(new BadRequestException(`Database error: ${e.message}`));
          }
        })
        .on('error', (e) => reject(new BadRequestException(e.message)));
    });
  }

  // Helper to map "option_1" or "A" to "A"
  private normalizeCorrectOption(val: string): string {
    if (!val) return 'A';
    const v = val.toLowerCase().trim();
    if (v === 'option_1' || v === 'a' || v === '1') return 'A';
    if (v === 'option_2' || v === 'b' || v === '2') return 'B';
    if (v === 'option_3' || v === 'c' || v === '3') return 'C';
    if (v === 'option_4' || v === 'd' || v === '4') return 'D';
    return 'A';
  }
}