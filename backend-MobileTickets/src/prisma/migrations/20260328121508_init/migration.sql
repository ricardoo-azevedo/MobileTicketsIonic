/*
  Warnings:

  - You are about to drop the column `codigo` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `codigo`,
    DROP COLUMN `tipo`;
