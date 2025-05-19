import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseTables1747438959994 implements MigrationInterface {
    name = 'BaseTables1747438959994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM ('RECURRENT', 'SINGLE', 'IN_INSTALLMENTS')`);
        await queryRunner.query(`CREATE TYPE "public"."institution_type_enum" AS ENUM ('BANK_ACCOUNT', 'CREDIT_CARD', 'ALL')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_status_enum" AS ENUM ('PAID', 'PENDING')`);
        await queryRunner.query(`CREATE TYPE "public"."operation_enum" AS ENUM ('INCOME', 'EXPENSE')`);

        await queryRunner.query(`CREATE TABLE "payment_method" ("payment_method_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ed16884cd19aa06b5eafbf0e013" PRIMARY KEY ("payment_method_id"))`);
        await queryRunner.query(`CREATE TABLE "issuers" ("issuer_id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo_url" character varying NOT NULL, "key_word" character varying NOT NULL, "popularity" integer NOT NULL, "color" character varying NOT NULL, "institution_type" "public"."institution_type_enum" NOT NULL, CONSTRAINT "PK_f7d75499b160d23e8402f036ea8" PRIMARY KEY ("issuer_id"))`);
        await queryRunner.query(`CREATE TABLE "credit_card_transaction" ("credit_card_transaction_id" SERIAL NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "fin_transaction_id" character varying NOT NULL, "notes" character varying NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "type" "public"."transaction_type_enum" NOT NULL, "category_id" integer, "credit_card_id" integer, CONSTRAINT "PK_a0965d59afa3d7eb006a3532a24" PRIMARY KEY ("credit_card_transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "credit_card" ("credit_card_id" SERIAL NOT NULL, "name" character varying NOT NULL, "credit_limit" numeric(10,2) NOT NULL DEFAULT '0', "due_day" integer NOT NULL, "closing_day" integer NOT NULL, "user_id" integer, "issuer_id" integer, CONSTRAINT "PK_344d64527bc9508596a827c259d" PRIMARY KEY ("credit_card_id"))`);
        await queryRunner.query(`CREATE TABLE "bank_account_transaction" ("bank_account_transaction_id" SERIAL NOT NULL, "description" character varying NOT NULL, "fin_transaction_id" character varying NOT NULL, "notes" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."transaction_status_enum" NOT NULL DEFAULT 'PENDING', "operation" "public"."operation_enum" NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "category_id" integer, "bank_account_id" integer, "payment_method_id" integer, CONSTRAINT "PK_7c1b8d4a335ab111bcc73bb8fc5" PRIMARY KEY ("bank_account_transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "bank_account" ("bank_account_id" SERIAL NOT NULL, "name" character varying NOT NULL, "initial_amount" numeric(10,2) NOT NULL DEFAULT '0', "user_id" integer, CONSTRAINT "PK_90383949e950141f103e9458da9" PRIMARY KEY ("bank_account_id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("category_id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "icon" character varying NOT NULL, "operation" "public"."operation_enum" NOT NULL, "user_id" integer, CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "credit_card_transaction" ADD CONSTRAINT "FK_51efd15f3aa4820eec733feb5ae" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credit_card_transaction" ADD CONSTRAINT "FK_83a36ab1a16d3fa39630c8ad4f6" FOREIGN KEY ("credit_card_id") REFERENCES "credit_card"("credit_card_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credit_card" ADD CONSTRAINT "FK_e2e8ed5e6717832d95f911767c2" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credit_card" ADD CONSTRAINT "FK_57a09d278fa5886ebc8e46bec59" FOREIGN KEY ("issuer_id") REFERENCES "issuers"("issuer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_account" ADD CONSTRAINT "FK_c8d57e8df596573a617476fdff2" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_account_transaction" ADD CONSTRAINT "FK_1992ebf91c46adb10c8c68cc7fa" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_account_transaction" ADD CONSTRAINT "FK_630ecfa50c1eca14b8b8982be1a" FOREIGN KEY ("bank_account_id") REFERENCES "bank_account"("bank_account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_account_transaction" ADD CONSTRAINT "FK_e7d23480cfe6dc1e1cae0324ace" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("payment_method_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_6562e564389d0600e6e243d9604" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_6562e564389d0600e6e243d9604"`);
        await queryRunner.query(`ALTER TABLE "bank_account_transaction" DROP CONSTRAINT "FK_e7d23480cfe6dc1e1cae0324ace"`);
        await queryRunner.query(`ALTER TABLE "bank_account_transaction" DROP CONSTRAINT "FK_630ecfa50c1eca14b8b8982be1a"`);
        await queryRunner.query(`ALTER TABLE "bank_account_transaction" DROP CONSTRAINT "FK_1992ebf91c46adb10c8c68cc7fa"`);
        await queryRunner.query(`ALTER TABLE "bank_account" DROP CONSTRAINT "FK_c8d57e8df596573a617476fdff2"`);
        await queryRunner.query(`ALTER TABLE "credit_card" DROP CONSTRAINT "FK_57a09d278fa5886ebc8e46bec59"`);
        await queryRunner.query(`ALTER TABLE "credit_card" DROP CONSTRAINT "FK_e2e8ed5e6717832d95f911767c2"`);
        await queryRunner.query(`ALTER TABLE "credit_card_transaction" DROP CONSTRAINT "FK_83a36ab1a16d3fa39630c8ad4f6"`);
        await queryRunner.query(`ALTER TABLE "credit_card_transaction" DROP CONSTRAINT "FK_51efd15f3aa4820eec733feb5ae"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "bank_account_transaction"`);
        await queryRunner.query(`DROP TABLE "bank_account"`);
        await queryRunner.query(`DROP TABLE "credit_card"`);
        await queryRunner.query(`DROP TABLE "issuers"`);
        await queryRunner.query(`DROP TABLE "credit_card_transaction"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
    }

}
