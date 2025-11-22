import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private prisma;
    constructor(prisma: PrismaService);
    bulkUploadExams(file: Express.Multer.File): Promise<any>;
    uploadQuestionsForExam(examId: string, file: Express.Multer.File): Promise<any>;
    private normalizeCorrectOption;
}
