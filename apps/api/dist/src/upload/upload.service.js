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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const csvParser = require("csv-parser");
const stream_1 = require("stream");
let UploadService = class UploadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bulkUploadExams(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded.');
        }
        const examsToCreate = [];
        const stream = stream_1.Readable.from(file.buffer.toString());
        return new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', (row) => {
                if (!row.name) {
                    return;
                }
                examsToCreate.push({
                    name: row.name,
                    slug: row.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
                    durationMinutes: parseInt(row.durationMinutes) || 60,
                    totalMarks: parseFloat(row.totalMarks) || 100,
                    passingMarks: parseFloat(row.passingMarks) || 40,
                    isPublished: false,
                });
            })
                .on('end', async () => {
                try {
                    const result = await this.prisma.exam.createMany({
                        data: examsToCreate,
                        skipDuplicates: true,
                    });
                    resolve({ message: `${result.count} exams uploaded successfully.` });
                }
                catch (e) {
                    reject(new common_1.BadRequestException(`Database error: ${e.message}`));
                }
            })
                .on('error', (e) => reject(new common_1.BadRequestException(e.message)));
        });
    }
    async uploadQuestionsForExam(examId, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded.');
        }
        const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
        if (!exam)
            throw new common_1.BadRequestException('Exam not found.');
        const questionsBySection = new Map();
        const stream = stream_1.Readable.from(file.buffer.toString());
        return new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', (row) => {
                const sectionName = row.subject || "General";
                const questionText = row.ques || row.text;
                const correctOpt = row.correctAnswer || row.correctOption;
                if (!questionText || !correctOpt)
                    return;
                if (!questionsBySection.has(sectionName)) {
                    questionsBySection.set(sectionName, []);
                }
                questionsBySection.get(sectionName).push({
                    text: questionText,
                    optionA: row.option_1 || row.optionA,
                    optionB: row.option_2 || row.optionB,
                    optionC: row.option_3 || row.optionC,
                    optionD: row.option_4 || row.optionD,
                    correctOption: this.normalizeCorrectOption(correctOpt),
                    explanation: row.explanation || null,
                    order: parseInt(row.ques_no || row.order || '0'),
                    marks: parseFloat(row.marks || '1'),
                });
            })
                .on('end', async () => {
                try {
                    const transactionPromises = [];
                    let totalQuestions = 0;
                    for (const [sectionName, questions] of questionsBySection.entries()) {
                        const sectionPromise = this.prisma.examSection.create({
                            data: {
                                examId: examId,
                                name: sectionName,
                                questions: {
                                    createMany: {
                                        data: questions
                                    }
                                }
                            }
                        });
                        transactionPromises.push(sectionPromise);
                        totalQuestions += questions.length;
                    }
                    await this.prisma.$transaction(transactionPromises);
                    resolve({ message: `Uploaded ${totalQuestions} questions into ${questionsBySection.size} sections.` });
                }
                catch (e) {
                    console.error(e);
                    reject(new common_1.BadRequestException(`Database error: ${e.message}`));
                }
            })
                .on('error', (e) => reject(new common_1.BadRequestException(e.message)));
        });
    }
    normalizeCorrectOption(val) {
        if (!val)
            return 'A';
        const v = val.toLowerCase().trim();
        if (v === 'option_1' || v === 'a' || v === '1')
            return 'A';
        if (v === 'option_2' || v === 'b' || v === '2')
            return 'B';
        if (v === 'option_3' || v === 'c' || v === '3')
            return 'C';
        if (v === 'option_4' || v === 'd' || v === '4')
            return 'D';
        return 'A';
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map