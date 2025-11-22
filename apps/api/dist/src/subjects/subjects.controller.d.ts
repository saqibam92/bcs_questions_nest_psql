import { SubjectsService } from './subjects.service';
import { Prisma } from '@prisma/client';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(createSubjectDto: Prisma.SubjectCreateInput): Prisma.Prisma__SubjectClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: string): Prisma.Prisma__SubjectClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, updateSubjectDto: Prisma.SubjectUpdateInput): Prisma.Prisma__SubjectClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__SubjectClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
