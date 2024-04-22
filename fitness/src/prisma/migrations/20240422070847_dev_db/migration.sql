/*
  Warnings:

  - You are about to drop the column `reps` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Set` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Rep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reps" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "setId" INTEGER NOT NULL,
    CONSTRAINT "Rep_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    "seanceId" INTEGER NOT NULL,
    CONSTRAINT "Set_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Set" ("exerciseId", "id", "seanceId") SELECT "exerciseId", "id", "seanceId" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
