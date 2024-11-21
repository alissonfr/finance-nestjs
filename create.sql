-- Usuário
INSERT INTO users (user_id, name, email, cpf, password) VALUES
(1, 'Alisson Rodrigues', 'alisson@gmail.com', '12345678901', 'alisson123');

-- Categorias de Transação
INSERT INTO transaction_category (transaction_category_id, name, user_id) VALUES
(1, 'Alimentação', 1),
(2, 'Transporte', 1),
(3, 'Saúde', 1),
(4, 'Lazer', 1),
(5, 'Educação', 1),
(6, 'Impostos', 1),
(7, 'Moradia', 1),
(8, 'Investimentos', 1),
(9, 'Vestuário', 1),
(10, 'Tecnologia', 1),
(11, 'Automóveis', 1),
(12, 'Viagem', 1),
(13, 'Beleza', 1),
(14, 'Serviços', 1),
(15, 'Presentes', 1),
(16, 'Pets', 1),
(17, 'Esportes', 1),
(18, 'Fitness', 1),
(19, 'Roupas', 1),
(20, 'Cultura', 1);

-- Contas
INSERT INTO account (account_id, name, initial_amount, user_id) VALUES
(1, 'Conta Corrente Banco A', 1000.00, 1),
(2, 'Conta Poupança Banco B', 2000.00, 1),
(3, 'Conta Corrente Banco C', 500.00, 1);

-- Cartões de Crédito
INSERT INTO credit_card (credit_card_id, name, credit_limit, brand, closing_date, due_date, user_id) VALUES
(1, 'Cartão Visa', 5000.00, 'Visa', '2024-11-20', '2024-12-10', 1),
(2, 'Cartão MasterCard', 3000.00, 'MasterCard', '2024-11-25', '2024-12-15', 1);

-- Transações
INSERT INTO transaction (transaction_id, date, description, type, amount, transaction_category_id, account_id, credit_card_id, user_id) VALUES
(1, '2024-11-01', 'Compra no supermercado', 'ACCOUNT', -150.50, 1, 1, NULL, 1),
(2, '2024-11-02', 'Passagem de ônibus', 'ACCOUNT', -4.50, 2, 1, NULL, 1),
(3, '2024-11-05', 'Salário', 'ACCOUNT', 3000.00, NULL, 1, NULL, 1),
(4, '2024-11-06', 'Consulta médica', 'ACCOUNT', -200.00, 3, 1, NULL, 1),
(5, '2024-11-07', 'Jantar no restaurante', 'CREDIT_CARD', -85.00, 4, NULL, 1, 1),
(6, '2024-11-08', 'Mensalidade de faculdade', 'ACCOUNT', -450.00, 5, 2, NULL, 1),
(7, '2024-11-09', 'Pagamento do aluguel', 'ACCOUNT', -800.00, 6, 1, NULL, 1),
(8, '2024-11-10', 'Compra de roupas', 'CREDIT_CARD', -220.00, 9, NULL, 1, 1),
(9, '2024-11-11', 'Viagem a São Paulo', 'CREDIT_CARD', -600.00, 12, NULL, 2, 1),
(10, '2024-11-12', 'Taxa de academia', 'ACCOUNT', -120.00, 18, 2, NULL, 1),
(11, '2024-11-13', 'Reparo do carro', 'CREDIT_CARD', -350.00, 11, NULL, 2, 1),
(12, '2024-11-14', 'Compra de presente de aniversário', 'CREDIT_CARD', -90.00, 15, NULL, 1, 1),
(13, '2024-11-15', 'Assinatura de Netflix', 'ACCOUNT', -45.00, 10, 1, NULL, 1),
(14, '2024-11-16', 'Compra de celular', 'CREDIT_CARD', -1500.00, 10, NULL, 1, 1),
(15, '2024-11-17', 'Imposto de renda', 'ACCOUNT', -300.00, 6, 3, NULL, 1),
(16, '2024-11-19', 'Troca de óleo do carro', 'CREDIT_CARD', -150.00, 11, NULL, 2, 1),
(17, '2024-11-20', 'Cinema com amigos', 'ACCOUNT', -45.00, 4, 1, NULL, 1);
