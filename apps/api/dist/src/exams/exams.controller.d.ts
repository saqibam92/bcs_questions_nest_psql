import { ExamsService } from './exams.service';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    create(createExamDto: any): import(".prisma/client").Prisma.Prisma__ExamClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        isPublished: boolean;
        _count: {
            sections: number;
        };
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ExamClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateExamDto: any): import(".prisma/client").Prisma.Prisma__ExamClient<{
        sections: {
            id: string;
            name: string;
            order: number;
            defaultMarks: number;
            subjectId: string | null;
            examId: string;
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ExamClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
