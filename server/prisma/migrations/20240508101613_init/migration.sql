/*
  Warnings:

  - You are about to drop the column `recipeId` on the `ingredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ingredient` DROP FOREIGN KEY `Ingredient_recipeId_fkey`;

-- AlterTable
ALTER TABLE `ingredient` DROP COLUMN `recipeId`;
