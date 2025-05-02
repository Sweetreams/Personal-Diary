-- CreateTable
CREATE TABLE "MailToken" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MailToken_email_key" ON "MailToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MailToken_token_key" ON "MailToken"("token");
