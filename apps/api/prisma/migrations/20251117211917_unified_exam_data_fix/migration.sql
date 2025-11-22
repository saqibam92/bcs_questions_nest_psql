-- 1. PREP WORK: Remove old constraints and indexes
ALTER TABLE "questions" DROP CONSTRAINT "questions_subjectId_fkey";
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_examId_fkey";
DROP INDEX "subjects_name_examId_key";

-- =================================================================
-- 2. ADD COLUMNS (Do NOT drop anything yet)
-- =================================================================

ALTER TABLE "exams"
    ADD COLUMN "description" TEXT,
    ADD COLUMN "durationMinutes" INTEGER NOT NULL DEFAULT 60,
    ADD COLUMN "examDate" TIMESTAMP(3),
    ADD COLUMN "hasNegativeMarking" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Untitled Exam',
    ADD COLUMN "negativeMarkingValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    ADD COLUMN "passingMarks" DOUBLE PRECISION NOT NULL DEFAULT 40,
    ADD COLUMN "slug" TEXT NOT NULL DEFAULT 'untitled-exam',
    ADD COLUMN "totalMarks" DOUBLE PRECISION NOT NULL DEFAULT 100;

ALTER TABLE "questions"
    ADD COLUMN "correctOption" TEXT NOT NULL DEFAULT 'A',
    ADD COLUMN "imageUrl" TEXT,
    ADD COLUMN "marks" DOUBLE PRECISION NOT NULL DEFAULT 1,
    ADD COLUMN "optionA" TEXT NOT NULL DEFAULT '',
    ADD COLUMN "optionB" TEXT NOT NULL DEFAULT '',
    ADD COLUMN "optionC" TEXT NOT NULL DEFAULT '',
    ADD COLUMN "optionD" TEXT NOT NULL DEFAULT '',
    ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN "sectionId" TEXT,
    ADD COLUMN "text" TEXT NOT NULL DEFAULT '';

ALTER TABLE "questions" ALTER COLUMN "explanation" DROP NOT NULL;

-- =================================================================
-- 3. DATA MIGRATION (Move data from old columns to new ones)
-- =================================================================

-- Exams: Migrate Name and Generate Slug
UPDATE "exams" e
SET "name" = e."exam_name";

UPDATE "exams" e
SET "slug" = (
    SELECT lower(regexp_replace(e."exam_name", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || right(e.id, 4)
)
WHERE e."slug" = 'untitled-exam';

-- Questions: Migrate Text and Options (PREVENTS DATA LOSS)
UPDATE "questions" SET "text" = "ques";
UPDATE "questions" SET "optionA" = "option_1", "optionB" = "option_2", "optionC" = "option_3", "optionD" = "option_4";

-- Questions: Attempt to map old correct answer text to new A/B/C/D Enum
UPDATE "questions" SET "correctOption" = CASE
    WHEN "correctAnswer" = "option_1" THEN 'A'
    WHEN "correctAnswer" = "option_2" THEN 'B'
    WHEN "correctAnswer" = "option_3" THEN 'C'
    WHEN "correctAnswer" = "option_4" THEN 'D'
    ELSE 'A' END;

-- =================================================================
-- 4. CLEANUP (Now it is safe to drop old columns)
-- =================================================================

ALTER TABLE "exams"
    DROP COLUMN "date",
    DROP COLUMN "exam_name",
    DROP COLUMN "highestMark",
    DROP COLUMN "totalExaminees";

ALTER TABLE "questions"
    DROP COLUMN "add_favourite",
    DROP COLUMN "correctAnswer",
    DROP COLUMN "option_1",
    DROP COLUMN "option_2",
    DROP COLUMN "option_3",
    DROP COLUMN "option_4",
    DROP COLUMN "ques",
    DROP COLUMN "ques_no",
    DROP COLUMN "subjectId";

ALTER TABLE "subjects" DROP COLUMN "examId";

-- =================================================================
-- 5. NEW STRUCTURE (Create new tables and constraints)
-- =================================================================

CREATE TABLE "exam_sections" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "subjectId" TEXT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "defaultMarks" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "exam_sections_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "exams_slug_key" ON "exams"("slug");
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

ALTER TABLE "exam_sections" ADD CONSTRAINT "exam_sections_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exam_sections" ADD CONSTRAINT "exam_sections_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "questions" ADD CONSTRAINT "questions_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "exam_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;