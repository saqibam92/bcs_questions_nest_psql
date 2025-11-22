import { QuestionsService } from './questions.service';
import { Prisma } from '@prisma/client';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(data: Prisma.QuestionCreateInput): Prisma.Prisma__QuestionClient<{
        section: {
            id: string;
            order: number;
            name: string;
            examId: string;
            subjectId: string | null;
            defaultMarks: number;
        };
    } & {
        id: string;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
        order: number;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
        section: {
            exam: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
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
            };
        } & {
            id: string;
            order: number;
            name: string;
            examId: string;
            subjectId: string | null;
            defaultMarks: number;
        };
    } & {
        id: string;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
        order: number;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
    })[]>;
    findOne(id: string): Prisma.Prisma__QuestionClient<{
        section: {
            exam: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
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
            };
        } & {
            id: string;
            order: number;
            name: string;
            examId: string;
            subjectId: string | null;
            defaultMarks: number;
        };
    } & {
        id: string;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
        order: number;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findBySection(sectionId: string): Prisma.PrismaPromise<{
        id: string;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
        order: number;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
    }[]>;
    update(id: string, data: Prisma.QuestionUpdateInput): Prisma.Prisma__QuestionClient<{
        section: {
            id: string;
            order: number;
            name: string;
            examId: string;
            subjectId: string | null;
            defaultMarks: number;
        };
    } & {
        id: string;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
        order: number;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__QuestionClient<{
        id: string;
        text: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string | null;
        imageUrl: string | null;
        marks: number;
        order: number;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
