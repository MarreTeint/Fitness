/*
  Warnings:

  - Added the required column `date` to the `Seance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seanceId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Seance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seance" ("id", "userId") SELECT "id", "userId" FROM "Seance";
DROP TABLE "Seance";
ALTER TABLE "new_Seance" RENAME TO "Seance";
CREATE TABLE "new_Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reps" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "seanceId" INTEGER NOT NULL,
    CONSTRAINT "Set_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Set" ("exerciseId", "id", "reps", "weight") SELECT "exerciseId", "id", "reps", "weight" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
