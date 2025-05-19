import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    this.logger.log('Conexão estabelecida com o banco de dados.');

    await queryRunner.startTransaction();
    this.logger.log('Transação iniciada.');

    try {
      this.logger.log('Gerando hash de senha...');
      const hashedPassword = await bcrypt.hash('123456', 10);
      this.logger.log('Hash de senha gerado.');

      this.logger.log('Inserindo usuário...');
      await queryRunner.query(`
        INSERT INTO users (user_id, name, email, cpf, password) VALUES
        (1, 'Alisson Rodrigues', 'alisson@gmail.com', '12345678901', '${hashedPassword}')
        ON CONFLICT (user_id) DO NOTHING;
      `);
      this.logger.log('Usuário inserido (ou já existia).');

      this.logger.log('Inserindo métodos de pagamento...');
      await queryRunner.query(`
        INSERT INTO payment_method (payment_method_id, name) VALUES
        (1, 'Cartão de Crédito'),
        (2, 'Cartão de Débito'),
        (3, 'Pix'),
        (4, 'Boleto Bancário'),
        (5, 'Transferência Bancária'),
        (6, 'Carnê'),
        (7, 'Apple Pay'),
        (8, 'Google Pay'),
        (9, 'Dinheiro')
        ON CONFLICT (payment_method_id) DO NOTHING;
      `);
      this.logger.log('Métodos de pagamento inseridos (ou já existiam).');

      this.logger.log('Inserindo conta bancária...');
      await queryRunner.query(`
        INSERT INTO bank_account (bank_account_id, name, user_id) VALUES
        (1, 'Carteira', 1)
        ON CONFLICT (bank_account_id) DO NOTHING;
      `);
      this.logger.log('Conta bancária inserida (ou já existia).');

      this.logger.log('Inserindo categorias...');
      await queryRunner.query(`
        INSERT INTO category (category_id, name, color, icon, operation, user_id) VALUES
        (1, 'Moradia', '#ef4444', 'home', 'EXPENSE', 1),
        (2, 'Transporte', '#f97316', 'directions_car', 'EXPENSE', 1),
        (3, 'Alimentação', '#f59e0b', 'restaurant', 'EXPENSE', 1),
        (4, 'Saúde', '#eab308', 'health_and_safety', 'EXPENSE', 1),
        (5, 'Educação', '#84cc16', 'school', 'EXPENSE', 1),
        (6, 'Lazer', '#22c55e', 'sports_esports', 'EXPENSE', 1),
        (7, 'Roupas e Acessórios', '#10b981', 'checkroom', 'EXPENSE', 1),
        (8, 'Eletrônicos', '#14b8a6', 'devices', 'EXPENSE', 1),
        (9, 'Presentes e Doações', '#06b6d4', 'card_giftcard', 'EXPENSE', 1),
        (10, 'Pets', '#0ea5e9', 'pets', 'EXPENSE', 1),
        (11, 'Beleza e Cuidados Pessoais', '#3b82f6', 'spa', 'EXPENSE', 1),
        (12, 'Emergências e Despesas Não Planejadas', '#6366f1', 'warning', 'EXPENSE', 1),
        (13, 'Viagens', '#8b5cf6', 'flight', 'EXPENSE', 1),
        (14, 'Assinaturas', '#a855f7', 'subscriptions', 'EXPENSE', 1),
        (15, 'Serviços', '#d946ef', 'handyman', 'EXPENSE', 1),
        (16, 'Entretenimento', '#ec4899', 'theaters', 'EXPENSE', 1),
        (17, 'Diversos', '#f43f5e', 'category', 'EXPENSE', 1),
        (18, 'Investimentos', '#ef4444', 'trending_up', 'EXPENSE', 1),
        (19, 'Salário', '#f97316', 'attach_money', 'INCOME', 1),
        (20, 'Empréstimos', '#f59e0b', 'account_balance', 'INCOME', 1),
        (21, 'Rendimentos', '#eab308', 'savings', 'INCOME', 1),
        (22, 'Outros', '#84cc16', 'more_horiz', 'INCOME', 1)
        ON CONFLICT (category_id) DO NOTHING;
      `);
      this.logger.log('Categorias inseridas (ou já existiam).');

      this.logger.log('Inserindo emissores...');
      await queryRunner.query(`
        INSERT INTO issuers (issuer_id, name, logo_url, key_word, popularity, color, institution_type) VALUES
        (1, 'Outros', 'public/issuers/other.png', 'other', 1, 'cc-other', 'ALL'),
        (2, 'Nubank', 'public/issuers/nubank.png', 'nubank', 1, 'cc-nubank', 'ALL'),
        (3, 'Banco Inter', 'public/issuers/intermedium.png', 'intermedium', 1, 'cc-inter', 'ALL'),
        (4, 'Banco do Brasil', 'public/issuers/bb.png', 'bb', 1, 'cc-bb', 'ALL'),
        (5, 'Bradesco', 'public/issuers/bradesco.png', 'bradesco', 1, 'cc-bradesco', 'ALL'),
        (6, 'Caixa', 'public/issuers/caixa.png', 'caixa', 1, 'cc-caixa', 'ALL'),
        (7, 'Hipercard', 'public/issuers/hipercard.png', 'hipercard', 1, 'cc-hipercard', 'BANK_ACCOUNT'),
        (8, 'Itaú', 'public/issuers/itau.png', 'itau', 1, 'cc-itau', 'ALL'),
        (9, 'Santander', 'public/issuers/santander.png', 'santander', 1, 'cc-santander', 'ALL'),
        (10, 'Iti', 'public/issuers/iti.png', 'iti', 2, 'cc-iti', 'BANK_ACCOUNT'),
        (11, 'Mercadopago', 'public/issuers/mercadopago.png', 'mercadopago', 2, 'cc-mercadopago', 'BANK_ACCOUNT'),
        (12, 'PagBank', 'public/issuers/pagbank.png', 'pagbank', 2, 'cc-pagbank', 'ALL'),
        (13, 'Pagseguro', 'public/issuers/pagseguro.png', 'pagseguro', 2, 'cc-pagseguro', 'ALL'),
        (14, 'Paypal', 'public/issuers/paypal.png', 'paypal', 2, 'cc-paypal', 'BANK_ACCOUNT'),
        (15, 'PicPay', 'public/issuers/picpay.png', 'picpay', 2, 'cc-picpay', 'ALL'),
        (16, 'American Express', 'public/issuers/amex.png', 'amex', 2, 'cc-amex', 'BANK_ACCOUNT'),
        (17, 'Mastercard', 'public/issuers/mastercard.png', 'mastercard', 2, 'cc-mastercard', 'BANK_ACCOUNT'),
        (18, 'Visa', 'public/issuers/visa.png', 'visa', 2, 'cc-visa', 'BANK_ACCOUNT'),
        (19, 'Diners', 'public/issuers/diners.png', 'diners', 2, 'cc-diners', 'BANK_ACCOUNT'),
        (20, 'Elo', 'public/issuers/elo.png', 'elo', 2, 'cc-elo', 'ALL'),
        (21, 'BTG Pactual', 'public/issuers/btgpactual.png', 'btgpactual', 2, 'cc-btg', 'BANK_ACCOUNT'),
        (22, 'Banco PAN', 'public/issuers/pan.png', 'pan', 2, 'cc-pan', 'ALL'),
        (23, 'Neon', 'public/issuers/neon.png', 'neon', 2, 'cc-neon', 'ALL'),
        (24, 'Next', 'public/issuers/next.png', 'next', 2, 'cc-next', 'ALL'),
        (25, 'C6 Bank', 'public/issuers/c6bank.png', 'c6bank', 2, 'cc-c6bank', 'ALL'),
        (26, 'Agibank', 'public/issuers/agibank.png', 'agibank', 2, 'cc-agibank', 'ALL'),
        (27, 'Digio', 'public/issuers/digio.png', 'digio', 2, 'cc-digio', 'BANK_ACCOUNT'),
        (28, 'Recargapay', 'public/issuers/recargapay.png', 'recargapay', 2, 'cc-recargapay', 'BANK_ACCOUNT'),
        (29, 'Rico', 'public/issuers/rico.png', 'rico', 2, 'cc-rico', 'BANK_ACCOUNT'),
        (30, 'Safra', 'public/issuers/safra.png', 'safra', 2, 'cc-safra', 'ALL'),
        (31, 'Sicoob', 'public/issuers/sicoob.png', 'sicoob', 2, 'cc-sicoob', 'ALL'),
        (32, 'Sicredi', 'public/issuers/sicredi.png', 'sicredi', 2, 'cc-sicredi', 'ALL'),
        (33, 'Sodexo', 'public/issuers/sodexo.png', 'sodexo', 2, 'cc-sodexo', 'ALL'),
        (34, 'Sofisa direto', 'public/issuers/sofisadireto.png', 'sofisadireto', 2, 'cc-sofisa', 'ALL'),
        (35, 'Xp Investimentos', 'public/issuers/xp.png', 'xp', 2, 'cc-xp', 'BANK_ACCOUNT'),
        (36, 'alelo', 'public/issuers/alelo.png', 'alelo', 2, 'cc-alelo', 'BANK_ACCOUNT'),
        (37, 'Flash', 'public/issuers/flash.png', 'flash', 2, 'cc-flash', 'BANK_ACCOUNT'),
        (38, 'Will', 'public/issuers/willbank.png', 'willbank', 2, 'cc-will', 'ALL'),
        (39, 'Ame Digital', 'public/issuers/ame.png', 'ame', 3, 'cc-amedigital', 'BANK_ACCOUNT'),
        (40, 'BMG', 'public/issuers/bmg.png', 'bmg', 3, 'cc-bmg', 'ALL'),
        (41, 'BRB', 'public/issuers/brb.png', 'brb', 3, 'cc-brb', 'ALL'),
        (42, 'BRDE', 'public/issuers/brde.png', 'brde', 3, 'cc-brde', 'ALL'),
        (43, 'BS2', 'public/issuers/bs2.png', 'bs2', 3, 'cc-bs2', 'ALL'),
        (44, 'Banco da Amazonia', 'public/issuers/amazonia.png', 'amazonia', 3, 'cc-amazonia', 'ALL'),
        (45, 'Banco Cacique', 'public/issuers/cacique.png', 'cacique', 3, 'cc-cacique', 'ALL'),
        (46, 'Banco Votorantim', 'public/issuers/votorantim.png', 'votorantim', 3, 'cc-votorantim', 'ALL'),
        (47, 'Banco do Nordeste', 'public/issuers/nordeste.png', 'nordeste', 3, 'cc-nordeste', 'ALL'),
        (48, 'Banese', 'public/issuers/banese.png', 'banese', 3, 'cc-banese', 'ALL'),
        (49, 'Banestes', 'public/issuers/banestes.png', 'banestes', 3, 'cc-banestes', 'ALL'),
        (50, 'Banif', 'public/issuers/banif.png', 'banif', 3, 'cc-banif', 'ALL'),
        (51, 'Banpara', 'public/issuers/banpara.png', 'banpara', 3, 'cc-banpara', 'ALL'),
        (52, 'Banrisul', 'public/issuers/banrisul.png', 'banrisul', 3, 'cc-banrisul', 'ALL'),
        (53, 'Bbm', 'public/issuers/bbm.png', 'bbm', 3, 'cc-bbm', 'ALL'),
        (54, 'Cetelem', 'public/issuers/cetelem.png', 'cetelem', 3, 'cc-cetelem', 'ALL'),
        (55, 'Citibank', 'public/issuers/citibank.png', 'citibank', 3, 'cc-citibank', 'ALL'),
        (56, 'Cruzeirodosul', 'public/issuers/cruzeirodosul.png', 'cruzeirodosul', 3, 'cc-cruzeirodosul', 'ALL'),
        (57, 'Digi+', 'public/issuers/digiplus.png', 'digiplus', 3, 'cc-digiplus', 'ALL')
        ON CONFLICT (issuer_id) DO NOTHING;
      `);
      this.logger.log('Emissores inseridos (ou já existiam).');

      await queryRunner.commitTransaction();
      this.logger.log('Transação confirmada com sucesso.');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Erro durante o seed:', err);
      throw err;
    } finally {
      await queryRunner.release();
      this.logger.log('QueryRunner liberado e conexão encerrada.');
    }
  }
}
