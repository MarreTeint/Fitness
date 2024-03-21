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
    "reps" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "muscularGroupId" INTEGER NOT NULL,
    CONSTRAINT "Exercise_muscularGroupId_fkey" FOREIGN KEY ("muscularGroupId") REFERENCES "MuscularGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Seance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToSeance" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ExerciseToSeance_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExerciseToSeance_B_fkey" FOREIGN KEY ("B") REFERENCES "Seance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToSeance_AB_unique" ON "_ExerciseToSeance"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToSeance_B_index" ON "_ExerciseToSeance"("B");
