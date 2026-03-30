/*
  Warnings:

  - Added the required column `guicheId` to the `Atendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Atendimento` ADD COLUMN `guicheId` INTEGER NOT NULL;
