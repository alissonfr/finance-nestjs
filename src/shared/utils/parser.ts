import { BadRequestException } from "@nestjs/common";

export const parseCurrencyToNumber = (currency: string): number => {
    const sanitized = currency.replace(/[^0-9,.-]+/g, '').trim();
    const normalized = sanitized.replace(/\./g, '').replace(',', '.');
    const numberValue = parseFloat(normalized);
    if (isNaN(numberValue)) {
      throw new BadRequestException(`O valor "${currency}" não pôde ser convertido para número.`);
    }
  
    return numberValue;
  }