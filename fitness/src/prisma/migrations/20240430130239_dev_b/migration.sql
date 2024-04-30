-- CreateTable
CREATE TABLE "MuscularGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "bodyPartId" INTEGER NOT NULL,
    CONSTRAINT "MuscularGroup_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "BodyPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BodyPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reps" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "seanceId" INTEGER NOT NULL,
    CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Set_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercice" (
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

-- CreateTable
CREATE TABLE "Seance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Seance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
