/*
  Warnings:

  - You are about to drop the `_ExerciseToSeance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `date` on the `Seance` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `bodyPartId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ExerciseToSeance_B_index";

-- DropIndex
DROP INDEX "_ExerciseToSeance_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ExerciseToSeance";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Seance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seance" ("id", "userId") SELECT "id", "userId" FROM "Seance";
DROP TABLE "Seance";
ALTER TABLE "new_Seance" RENAME TO "Seance";
CREATE TABLE "new_Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reps" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "exerciseId" INTEGER NOT NULL
);
INSERT INTO "new_Set" ("exerciseId", "id", "reps", "weight") SELECT "exerciseId", "id", "reps", "weight" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "muscularGroupId" INTEGER NOT NULL,
    "bodyPartId" INTEGER NOT NULL,
    CONSTRAINT "Exercise_muscularGroupId_fkey" FOREIGN KEY ("muscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "BodyPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("description", "id", "muscularGroupId") SELECT "description", "id", "muscularGroupId" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
