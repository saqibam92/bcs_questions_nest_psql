import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ExamsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ExamCreateInput): Prisma.Prisma__ExamClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        isPublished: boolean;
        _count: {
            sections: number;
        };
    }[]>;
    findOne(id: string): Prisma.Prisma__ExamClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.ExamUpdateInput): Prisma.Prisma__ExamClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__ExamClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
