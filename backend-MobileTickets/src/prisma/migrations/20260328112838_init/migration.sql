/*
  Warnings:

  - A unique constraint covering the columns `[ticketId]` on the table `Atendimento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guicheId` to the `Atendimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketId` to the `Atendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Atendimento` ADD COLUMN `guicheId` INTEGER NOT NULL,
    ADD COLUMN `ticketId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Atendimento_ticketId_key` ON `Atendimento`(`ticketId`);

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_guicheId_fkey` FOREIGN KEY (`guicheId`) REFERENCES `Guiche`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
