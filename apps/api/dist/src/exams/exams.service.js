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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamsService = class ExamsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.exam.create({
            data,
            include: {
                sections: {
                    include: { questions: true }
                }
            }
        });
    }
    findAll() {
        return this.prisma.exam.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                slug: true,
                isPublished: true,
                createdAt: true,
                _count: {
                    select: { sections: true }
                }
            }
        });
    }
    findOne(id) {
        return this.prisma.exam.findUnique({
            where: { id },
            include: {
                sections: {
                    include: { questions: true },
                    orderBy: { order: 'asc' }
                }
            }
        });
    }
    update(id, data) {
        return this.prisma.exam.update({
            where: { id },
            data,
            include: { sections: true }
        });
    }
    remove(id) {
        return this.prisma.exam.delete({ where: { id } });
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map