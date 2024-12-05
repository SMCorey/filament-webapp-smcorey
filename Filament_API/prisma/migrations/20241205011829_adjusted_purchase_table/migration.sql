/*
  Warnings:

  - You are about to drop the column `invoice_amt` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_tax` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_total` on the `Purchase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "credit_card" TEXT,
    "credit_expire" TEXT,
    "credit_cvv" TEXT,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("city", "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "order_date", "postal_code", "province", "purchase_id", "street") SELECT "city", "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "order_date", "postal_code", "province", "purchase_id", "street" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
