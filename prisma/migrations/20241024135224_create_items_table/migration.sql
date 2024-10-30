-- CreateTable
CREATE TABLE "items" (
    "itemnumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" TEXT,
    "unitprice" TEXT,

    CONSTRAINT "items_pkey" PRIMARY KEY ("itemnumber")
);
