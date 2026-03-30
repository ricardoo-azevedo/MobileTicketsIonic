/*
  Warnings:

  - Added the required column `codigo` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `codigo` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipo` ENUM('SP', 'SG', 'SE') NOT NULL;
