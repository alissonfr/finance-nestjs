INSERT INTO users (user_id, name, email, cpf, password) VALUES
(1, 'Alisson Rodrigues', 'alisson@gmail.com', '12345678901', '$2b$10$4u1s.HiYa7VLM0Pjini4eeIvvAt3aUbOhortBkS3VI5mqreoNye2O');

INSERT INTO payment_method (name) VALUES
('Cartão de Crédito'),
('Cartão de Débito'),
('Pix'),
('Boleto Bancário'),
('Transferência Bancária'),
('Carnê'),
('Apple Pay'),
('Google Pay'),
('Dinheiro');

INSERT INTO bank_account (name, user_id) VALUES
('Carteira', 1);

INSERT INTO category (name, color, icon, operation, user_id) VALUES
('Moradia', '#ef4444', 'home', 'EXPENSE', 1),
('Transporte', '#f97316', 'directions_car', 'EXPENSE', 1),
('Alimentação', '#f59e0b', 'restaurant', 'EXPENSE', 1),
('Saúde', '#eab308', 'health_and_safety', 'EXPENSE', 1),
('Educação', '#84cc16', 'school', 'EXPENSE', 1),
('Lazer', '#22c55e', 'sports_esports', 'EXPENSE', 1),
('Roupas e Acessórios', '#10b981', 'checkroom', 'EXPENSE', 1),
('Eletrônicos', '#14b8a6', 'devices', 'EXPENSE', 1),
('Presentes e Doações', '#06b6d4', 'card_giftcard', 'EXPENSE', 1),
('Pets', '#0ea5e9', 'pets', 'EXPENSE', 1),
('Beleza e Cuidados Pessoais', '#3b82f6', 'spa', 'EXPENSE', 1),
('Emergências e Despesas Não Planejadas', '#6366f1', 'warning', 'EXPENSE', 1),
('Viagens', '#8b5cf6', 'flight', 'EXPENSE', 1),
('Assinaturas', '#a855f7', 'subscriptions', 'EXPENSE', 1),
('Serviços', '#d946ef', 'handyman', 'EXPENSE', 1),
('Entretenimento', '#ec4899', 'theaters', 'EXPENSE', 1),
('Diversos', '#f43f5e', 'category', 'EXPENSE', 1),
('Investimentos', '#ef4444', 'trending_up', 'EXPENSE', 1),
('Salário', '#f97316', 'attach_money', 'INCOME', 1),
('Empréstimos', '#f59e0b', 'account_balance', 'INCOME', 1),
('Rendimentos', '#eab308', 'savings', 'INCOME', 1),
('Outros', '#84cc16', 'more_horiz', 'INCOME', 1);
