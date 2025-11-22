import { PrismaService } from '../prisma/prisma.service';
export declare class ExamService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllExams(): Promise<{
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
    }[]>;
    getExamById(id: string): Promise<{
        sections: ({
            questions: {
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
            }[];
        } & {
            id: string;
            name: string;
            order: number;
            examId: string;
            subjectId: string | null;
            defaultMarks: number;
        })[];
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
    getExamWithSections(id: string): Promise<{
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
