/*
  Warnings:

  - A unique constraint covering the columns `[personId,userId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_personId_userId_key" ON "Chat"("personId", "userId");
