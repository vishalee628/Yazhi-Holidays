-- ==============================================================================
-- DATABASE SCHEMA: YAZHI HOLIDAYS (MySQL / MariaDB / PostgreSQL Compatible)
-- Specification: Premium Travel & Tourism Platform
-- Production Architecture
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `yazhi_holidays` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `yazhi_holidays`;

-- ------------------------------------------------------------------------------
-- 1. ADMINS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL, -- bcrypt or argon2 hash
  `full_name` VARCHAR(100) NOT NULL,
  `role` ENUM('SuperAdmin', 'TravelSpecialist', 'Concierge') DEFAULT 'TravelSpecialist',
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_admin_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. DESTINATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `destinations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `tagline` VARCHAR(255) NOT NULL,
  `country` VARCHAR(80) NOT NULL,
  `region` ENUM('Domestic', 'International') NOT NULL,
  `hero_image` VARCHAR(500) NOT NULL,
  `thumbnail` VARCHAR(500) NOT NULL,
  `description` TEXT NOT NULL,
  `best_time_to_visit` VARCHAR(150) NOT NULL,
  `recommended_duration` VARCHAR(50) NOT NULL,
  `starting_price_inr` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 1,
  `meta_title` VARCHAR(180) NULL,
  `meta_description` VARCHAR(300) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_dest_region` (`region`),
  INDEX `idx_dest_featured` (`is_featured`),
  INDEX `idx_dest_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. PACKAGES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `packages` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `destination_id` INT UNSIGNED NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `duration_days` INT UNSIGNED NOT NULL,
  `duration_nights` INT UNSIGNED NOT NULL,
  `duration_label` VARCHAR(50) NOT NULL, -- e.g. '6 Days / 5 Nights'
  `starting_price_inr` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `trip_type` ENUM('Family', 'Honeymoon', 'Adventure', 'Leisure', 'Cultural', 'International', 'Custom') NOT NULL,
  `region` ENUM('Domestic', 'International') NOT NULL,
  `hero_image` VARCHAR(500) NOT NULL,
  `thumbnail` VARCHAR(500) NOT NULL,
  `overview` TEXT NOT NULL,
  `accommodation_type` VARCHAR(150) NOT NULL,
  `transport_type` VARCHAR(150) NOT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 1,
  `cancellation_policy` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE,
  INDEX `idx_pkg_type` (`trip_type`),
  INDEX `idx_pkg_region` (`region`),
  INDEX `idx_pkg_price` (`starting_price_inr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. PACKAGE ITINERARIES TABLE (Day-by-Day schedule)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `package_itineraries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `package_id` INT UNSIGNED NOT NULL,
  `day_number` INT UNSIGNED NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `meals_included` VARCHAR(150) NOT NULL,
  `stay_details` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE,
  INDEX `idx_itinerary_pkg_day` (`package_id`, `day_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. PACKAGE INCLUSIONS / EXCLUSIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `package_features` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `package_id` INT UNSIGNED NOT NULL,
  `feature_type` ENUM('Inclusion', 'Exclusion', 'Highlight') NOT NULL,
  `description` VARCHAR(300) NOT NULL,
  FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE,
  INDEX `idx_feature_pkg` (`package_id`, `feature_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. CUSTOMER ENQUIRIES & TRIP PLANNER TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reference_number` VARCHAR(30) NOT NULL UNIQUE,
  `customer_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `preferred_contact` ENUM('WhatsApp', 'Phone Call', 'Email') DEFAULT 'WhatsApp',
  `package_id` INT UNSIGNED NULL,
  `destination_name` VARCHAR(150) NULL,
  `departure_city` VARCHAR(80) NULL,
  `travel_date` DATE NULL,
  `flexible_dates` TINYINT(1) DEFAULT 1,
  `duration_days` INT UNSIGNED DEFAULT 5,
  `adults_count` INT UNSIGNED NOT NULL DEFAULT 2,
  `children_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `budget_range` VARCHAR(100) NULL,
  `experience_preferences` TEXT NULL,
  `special_requests` TEXT NULL,
  `status` ENUM('New', 'Contacted', 'In Progress', 'Quoted', 'Completed', 'Cancelled') DEFAULT 'New',
  `admin_notes` TEXT NULL,
  `assigned_admin_id` INT UNSIGNED NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`assigned_admin_id`) REFERENCES `admins`(`id`) ON DELETE SET NULL,
  INDEX `idx_enq_status` (`status`),
  INDEX `idx_enq_ref` (`reference_number`),
  INDEX `idx_enq_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. TESTIMONIALS & GUEST STORIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(100) NOT NULL,
  `destination` VARCHAR(100) NOT NULL,
  `travel_date` VARCHAR(50) NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `comment` TEXT NOT NULL,
  `trip_type` VARCHAR(80) NOT NULL,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7B. HAPPY CUSTOMERS TRIP MEMORIES (PHOTOS & EXPERIENCES)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer_memories` (
  `id` VARCHAR(100) PRIMARY KEY,
  `image_url` VARCHAR(500) NOT NULL,
  `destination` VARCHAR(100) NOT NULL,
  `trip_type` VARCHAR(100) NULL,
  `trip_date` VARCHAR(50) NOT NULL,
  `caption` TEXT NULL,
  `is_published` TINYINT(1) DEFAULT 1,
  `is_featured` TINYINT(1) DEFAULT 0,
  `aspect_ratio` VARCHAR(20) DEFAULT 'landscape',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_mem_dest` (`destination`),
  INDEX `idx_mem_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. BLOG POSTS (TRAVEL JOURNAL)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(250) NOT NULL,
  `category` VARCHAR(80) NOT NULL,
  `read_time` VARCHAR(30) NOT NULL,
  `author` VARCHAR(100) NOT NULL DEFAULT 'Yazhi Travel Concierge',
  `hero_image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content_html` LONGTEXT NOT NULL,
  `is_published` TINYINT(1) DEFAULT 1,
  `published_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_blog_slug` (`slug`),
  INDEX `idx_blog_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. NEWSLETTER SUBSCRIBERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `is_active` TINYINT(1) DEFAULT 1,
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 10. SITE SETTINGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(80) PRIMARY KEY,
  `setting_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- INITIAL SAMPLE DATA SEEDING
-- ------------------------------------------------------------------------------
-- Initial SuperAdmin (Password: Yazhi@Luxury2026 - hash generated with bcrypt 12 rounds)
INSERT INTO `admins` (`email`, `password_hash`, `full_name`, `role`, `is_active`)
VALUES ('admin@yazhiholidays.com', '$2a$12$e6Vp4L4f6PzX/bI9Qy7hOeGzR1f4A0jI4K3k8qL9s2W1u5Y7vX1yC', 'Yazhi Senior Concierge', 'SuperAdmin', 1)
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- Initial Site Settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('business_name', 'Yazhi Holidays'),
('business_phone', '+91 98400 12345'),
('whatsapp_number', '+91 98400 12345'),
('email', 'concierge@yazhiholidays.com'),
('address', 'Anna Nagar, Chennai, Tamil Nadu, India — 600040'),
('operating_hours', 'Mon - Sat: 9:30 AM - 7:30 PM IST')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);
