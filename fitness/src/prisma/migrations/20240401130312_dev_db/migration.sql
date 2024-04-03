/*
  Warnings:

  - You are about to drop the `ExerciseMuscularGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstMuscularGroupId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondMuscularGroupId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdMuscularGroupId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExerciseMuscularGroup";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "firstMuscularGroupId" INTEGER NOT NULL,
    "secondMuscularGroupId" INTEGER NOT NULL,
    "thirdMuscularGroupId" INTEGER NOT NULL,
    "bodyPartId" INTEGER NOT NULL,
    CONSTRAINT "Exercise_firstMuscularGroupId_fkey" FOREIGN KEY ("firstMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_secondMuscularGroupId_fkey" FOREIGN KEY ("secondMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_thirdMuscularGroupId_fkey" FOREIGN KEY ("thirdMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("bodyPartId", "description", "id", "name") SELECT "bodyPartId", "description", "id", "name" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
