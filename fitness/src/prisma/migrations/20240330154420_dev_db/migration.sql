-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "muscularGroupId" INTEGER NOT NULL,
    "bodyPartId" INTEGER NOT NULL
);
INSERT INTO "new_Exercise" ("bodyPartId", "description", "id", "muscularGroupId") SELECT "bodyPartId", "description", "id", "muscularGroupId" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
