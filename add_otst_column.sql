-- Migration Script: Add OTST (Order Trip Status) column to OrderTrips Table
-- Date: 2026-05-08
-- Description: Adds OTST column to track granular status for each trip leg

-- Add OTST column
ALTER TABLE OrderTrips 
ADD COLUMN IF NOT EXISTS OTST VARCHAR(20) NULL 
COMMENT 'Order trip status (e.g., Trip 1 Started, Order Delivered 1)' 
AFTER OTDD;

-- Verify the column was added
SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'OrderTrips' 
AND COLUMN_NAME = 'OTST';
