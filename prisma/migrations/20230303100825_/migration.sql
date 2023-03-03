/*
  Warnings:

  - Made the column `image` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prompt` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "prompt" SET NOT NULL;
