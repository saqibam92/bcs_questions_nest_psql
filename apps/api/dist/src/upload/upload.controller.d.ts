import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    bulkUploadExams(file: Express.Multer.File): Promise<any>;
    uploadQuestionsForExam(examId: string, file: Express.Multer.File): Promise<any>;
}
