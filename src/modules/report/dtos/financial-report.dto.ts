
export class FinancialReportDTO {
  totalBalance: {
    current: number;  // Current balance across all accounts
    percentageChange: number;  // Percentage change compared to the previous month
  };
  income: {
    received: number;  // Amount received
    expected: number;  // Expected amount
  };
  expenses: {
    paid: number;  // Amount paid
    expected: number;  // Expected amount
  };
}