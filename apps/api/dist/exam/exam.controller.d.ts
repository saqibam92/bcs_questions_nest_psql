import { ExamService } from './exam.service';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    getAllExams(): Promise<{
        success: boolean;
        count: number;
        data: {
            id: string;
            exam_name: string;
            createdAt: Date;
        }[];
    }>;
    getExamById(id: string): Promise<{
        success: boolean;
        data: {
            subjects: {
                id: string;
                name: string;
            }[];
        } & {
            id: string;
            exam_name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getQuestionsForSubject(subjectId: string): Promise<{
        success: boolean;
        count: number;
        data: {
            id: string;
            ques_no: number;
            ques: string;
            option_1: string;
            option_2: string;
            option_3: string;
            option_4: string;
            correctAnswer: string;
            explanation: string;
            add_favourite: boolean;
            subjectId: string;
        }[];
    }>;
}
