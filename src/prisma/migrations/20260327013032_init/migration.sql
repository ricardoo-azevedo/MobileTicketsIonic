/*
  Warnings:

  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `status` ENUM('EMITIDO', 'ATENDIDO', 'DESCARTADO') NOT NULL,
    ADD COLUMN `tipo` ENUM('SP', 'SG', 'SE') NOT NULL;
