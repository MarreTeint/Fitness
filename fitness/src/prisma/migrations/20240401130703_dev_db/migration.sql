/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Exercise";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Exercice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "firstMuscularGroupId" INTEGER NOT NULL,
    "secondMuscularGroupId" INTEGER NOT NULL,
    "thirdMuscularGroupId" INTEGER NOT NULL,
    "bodyPartId" INTEGER NOT NULL,
    CONSTRAINT "Exercice_firstMuscularGroupId_fkey" FOREIGN KEY ("firstMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercice_secondMuscularGroupId_fkey" FOREIGN KEY ("secondMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercice_thirdMuscularGroupId_fkey" FOREIGN KEY ("thirdMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
