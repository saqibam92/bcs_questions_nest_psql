"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamService = class ExamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllExams() {
        return this.prisma.exam.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                createdAt: true,
            },
            where: {
                isPublished: true,
            },
        });
    }
    async getExamById(id) {
        const exam = await this.prisma.exam.findUnique({
            where: { id },
            include: {
                sections: {
                    include: {
                        questions: true,
                    },
                    orderBy: {
                        order: 'asc',
                    }
                },
            },
        });
        if (!exam) {
            throw new common_1.NotFoundException('Exam not found');
        }
        return exam;
    }
    async getExamWithSections(id) {
        const exam = await this.prisma.exam.findUnique({
            where: { id },
            include: {
                sections: {
                    select: {
                        id: true,
                        name: true,
                        defaultMarks: true,
                    },
                    orderBy: {
                        order: 'asc',
                    }
                },
            },
        });
        if (!exam) {
            throw new common_1.NotFoundException('Exam not found');
        }
        return exam;
    }
    async getQuestionsForSection(sectionId) {
        return this.prisma.question.findMany({
            where: { sectionId },
            orderBy: { order: 'asc' }
        });
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamService);
//# sourceMappingURL=exam.service.js.map