import { AdminRole, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Updated types to match new JSON structure
// type JsonQuestion = {
//   ques_no: number;
//   ques: string;
//   option_1: string;
//   option_2: string;
//   option_3: string;
//   option_4: string;
//   correctAnswer: string;
//   explanation: string;
//   add_favourite: boolean;
// };

// type JsonSubject = {
//   subject: string;
//   questions: JsonQuestion[];
// };

// type JsonExam = {
//   exam_name: string;
//   date?: string;
//   totalExaminees?: number;
//   highestMark?: number;
//   subjectWiseSort: JsonSubject[];
// };

// Hash password
async function hashPassword(password: string): Promise<string> {
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
  } else {
    // 2. Hash the password
    const hashedPassword = await hashPassword(adminPassword);

    // 3. Create the super admin
    const admin = await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: AdminRole.SUPER_ADMIN,
      },
    });
    console.log(`Created super admin with id: ${admin.id}`);
  }

  // const dataPath = path.join(__dirname, 'data.json');
  // const rawData = fs.readFileSync(dataPath, 'utf-8');
  // const examData: JsonExam[] = JSON.parse(rawData);

  // await prisma.question.deleteMany();
  // await prisma.subject.deleteMany();
  // await prisma.exam.deleteMany();
  // console.log('Cleared existing data.');

  // for (const exam of examData) {
  //   const createdExam = await prisma.exam.create({
  //     data: {
  //       exam_name: exam.exam_name,
  //       // --- ADD NEW DATA ---
  //       date: exam.date ? new Date(exam.date) : null,
  //       totalExaminees: exam.totalExaminees,
  //       highestMark: exam.highestMark,
  //       // --------------------
  //       subjects: {
  //         create: exam.subjectWiseSort.map((subject) => ({
  //           name: subject.subject,
  //           questions: {
  //             create: subject.questions.map((q) => ({
  //               ques_no: q.ques_no,
  //               ques: q.ques,
  //               option_1: q.option_1,
  //               option_2: q.option_2,
  //               option_3: q.option_3,
  //               option_4: q.option_4,
  //               correctAnswer: q.correctAnswer,
  //               explanation: q.explanation,
  //               add_favourite: q.add_favourite || false,
  //             })),
  //           },
  //         })),
  //       },
  //     },
  //   });

  //   console.log(`Created exam: ${createdExam.exam_name} (ID: ${createdExam.id})`);
  // }

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