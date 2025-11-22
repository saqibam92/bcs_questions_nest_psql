/*
  Warnings:

  - A unique constraint covering the columns `[name,examId]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_examId_key" ON "subjects"("name", "examId");
