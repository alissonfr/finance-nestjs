INSERT INTO users (user_id, name, email, cpf, password) VALUES
(1, 'Alisson Rodrigues', 'alisson@gmail.com', '12345678901', 'alisson123');

INSERT INTO transaction_category (transaction_category_id, name, user_id) VALUES
(1, 'Alimentação', 1),
(2, 'Transporte', 1);

INSERT INTO account (account_id, name, initial_amount, user_id) VALUES
(1, 'Conta Corrente Banco A', 1000.00, 1),
(2, 'Conta Poupança Banco B', 2000.00, 1);

INSERT INTO transaction (transaction_id, date, description, amount, transaction_category_id, account_id, user_id) VALUES
(1, '2024-11-01', 'Compra no supermercado', -150.50, 1, 1, 1),
(2, '2024-11-02', 'Passagem de ônibus', -4.50, 2, 1, 1),
(5, '2024-11-05', 'Salário', 3000.00, 1, 1, 1);
