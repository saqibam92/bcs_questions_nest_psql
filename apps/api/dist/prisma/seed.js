"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
async function main() {
    console.log(`Start seeding ...`);
    const adminEmail = 'superadmin@example.com';
    const adminPassword = 'password123';
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: adminEmail },
    });
    if (existingAdmin) {
        console.log('Super admin already exists. Skipping...');
    }
    else {
        const hashedPassword = await hashPassword(adminPassword);
        const admin = await prisma.admin.create({
            data: {
                name: 'Super Admin',
                email: adminEmail,
                password: hashedPassword,
                role: client_1.AdminRole.SUPER_ADMIN,
            },
        });
        console.log(`Created super admin with id: ${admin.id}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map