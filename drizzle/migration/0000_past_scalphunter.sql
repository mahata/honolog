CREATE TABLE `article` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`text` text DEFAULT '',
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
