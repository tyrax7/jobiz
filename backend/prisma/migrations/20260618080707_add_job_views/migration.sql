-- DropIndex
DROP INDEX `applications_jobId_fkey` ON `applications`;

-- DropIndex
DROP INDEX `companies_cityId_fkey` ON `companies`;

-- DropIndex
DROP INDEX `job_category_on_job_categoryId_fkey` ON `job_category_on_job`;

-- DropIndex
DROP INDEX `job_type_on_job_typeId_fkey` ON `job_type_on_job`;

-- DropIndex
DROP INDEX `jobs_cityId_fkey` ON `jobs`;

-- DropIndex
DROP INDEX `jobs_companyId_fkey` ON `jobs`;

-- CreateTable
CREATE TABLE `job_views` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,
    `jobId` INTEGER NOT NULL,

    UNIQUE INDEX `job_views_jobId_key`(`jobId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_daily_views` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` DATETIME(3) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `jobId` INTEGER NOT NULL,

    UNIQUE INDEX `job_daily_views_jobId_day_key`(`jobId`, `day`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_category_on_job` ADD CONSTRAINT `job_category_on_job_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_category_on_job` ADD CONSTRAINT `job_category_on_job_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `job_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_type_on_job` ADD CONSTRAINT `job_type_on_job_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_type_on_job` ADD CONSTRAINT `job_type_on_job_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `job_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_views` ADD CONSTRAINT `job_views_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_daily_views` ADD CONSTRAINT `job_daily_views_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
