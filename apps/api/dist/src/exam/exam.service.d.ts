import { PrismaService } from '../prisma/prisma.service';
export declare class ExamService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllExams(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
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
            defaultMarks: number;
            subjectId: string | null;
            examId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        durationMinutes: number;
        totalMarks: number;
        passingMarks: number;
        examDate: Date | null;
        isPublished: boolean;
        hasNegativeMarking: boolean;
        negativeMarkingValue: number;
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
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        durationMinutes: number;
        totalMarks: number;
        passingMarks: number;
        examDate: Date | null;
        isPublished: boolean;
        hasNegativeMarking: boolean;
        negativeMarkingValue: number;
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
