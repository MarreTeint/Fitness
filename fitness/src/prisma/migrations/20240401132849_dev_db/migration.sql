-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "firstMuscularGroupId" INTEGER NOT NULL,
    "secondMuscularGroupId" INTEGER,
    "thirdMuscularGroupId" INTEGER,
    "bodyPartId" INTEGER NOT NULL,
    CONSTRAINT "Exercice_firstMuscularGroupId_fkey" FOREIGN KEY ("firstMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercice_secondMuscularGroupId_fkey" FOREIGN KEY ("secondMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Exercice_thirdMuscularGroupId_fkey" FOREIGN KEY ("thirdMuscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Exercice_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "BodyPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exercice" ("bodyPartId", "description", "firstMuscularGroupId", "id", "name", "secondMuscularGroupId", "thirdMuscularGroupId") SELECT "bodyPartId", "description", "firstMuscularGroupId", "id", "name", "secondMuscularGroupId", "thirdMuscularGroupId" FROM "Exercice";
DROP TABLE "Exercice";
ALTER TABLE "new_Exercice" RENAME TO "Exercice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
