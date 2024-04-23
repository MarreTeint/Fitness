/*
  Warnings:

  - You are about to drop the `Rep` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reps` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rep";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reps" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "seanceId" INTEGER NOT NULL,
    CONSTRAINT "Set_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Set" ("exerciseId", "id", "seanceId") SELECT "exerciseId", "id", "seanceId" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
