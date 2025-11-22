import { ExamService } from './exam.service';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    getAllExams(): Promise<{
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
    }[]>;
    getExamById(id: string): Promise<{
        sections: {
            id: string;
            name: string;
            defaultMarks: number;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        durationMinutes: number;
        totalMarks: number;
        passingMarks: number;
        examDate: Date | null;
        isPublished: boolean;
        hasNegativeMarking: boolean;
        negativeMarkingValue: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getQuestionsForSection(sectionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        sectionId: string | null;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
    }[]>;
}
