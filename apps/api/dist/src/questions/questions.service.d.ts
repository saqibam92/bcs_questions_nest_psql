import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.QuestionCreateInput): Prisma.Prisma__QuestionClient<{
        section: {
            id: string;
            name: string;
            order: number;
            defaultMarks: number;
            subjectId: string | null;
            examId: string;
        };
    } & {
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
        section: {
            exam: {
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
            };
        } & {
            id: string;
            name: string;
            order: number;
            defaultMarks: number;
            subjectId: string | null;
            examId: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Prisma.Prisma__QuestionClient<{
        section: {
            exam: {
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
            };
        } & {
            id: string;
            name: string;
            order: number;
            defaultMarks: number;
            subjectId: string | null;
            examId: string;
        };
    } & {
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findBySection(sectionId: string): Prisma.PrismaPromise<{
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
    update(id: string, data: Prisma.QuestionUpdateInput): Prisma.Prisma__QuestionClient<{
        section: {
            id: string;
            name: string;
            order: number;
            defaultMarks: number;
            subjectId: string | null;
            examId: string;
        };
    } & {
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__QuestionClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
