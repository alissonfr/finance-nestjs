import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../output/TransactionRepository';
import { TransactionService } from './TransactionService';
import { TransactionResponse } from 'src/adapters/model/response/transaction-response.dto';
import { TransactionRequest } from 'src/adapters/model/request/transaction-request.dto';
import { TransactionMapper } from 'src/domain/mapper/transaction.mapper';
import { TransactionCategoryRepository } from '../output/TransactionCategoryRepository';
import { AccountRepository } from '../output/AccountRepository';
import { UserRepository } from '../output/UserRepository';
import { CreditCardRepository } from '../output/CreditCardRepository';
import { TransactionType } from 'src/domain/enums/transaction-type.enum';

@Injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @Inject(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
    @Inject(TransactionCategoryRepository)
    private readonly transactionCategoryRepository: TransactionCategoryRepository,
    @Inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
    @Inject(CreditCardRepository)
    private readonly creditCardRepository: CreditCardRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async find({ page, limit, year, month }): Promise<TransactionResponse[]> {
    const transactions = await this.transactionRepository.find({ page, limit, year, month });
    return transactions.map(transaction => TransactionMapper.toResponse(transaction));
  }

  async findById(id: number): Promise<TransactionResponse> {
    const transaction = await this.transactionRepository.findById(id);
    return TransactionMapper.toResponse(transaction);
  }

  async save(request: TransactionRequest): Promise<TransactionResponse> {
    const category = await this.transactionCategoryRepository.findById(request.categoryId);
    const user = await this.userRepository.findById(request.userId);
    
    if(request.type === TransactionType.CREDIT_CARD) {
      const creditCard = await this.creditCardRepository.findById(request.creditCardId);
      return TransactionMapper.toResponse(await this.transactionRepository.save({ ...request, category, user, creditCard }));
    }
    
    if(request.type === TransactionType.ACCOUNT) {
      const account = await this.accountRepository.findById(request.accountId);
      return TransactionMapper.toResponse(await this.transactionRepository.save({ ...request, category, user, account }));
    } 
  }

  async update(id: number, request: TransactionRequest): Promise<TransactionResponse> {
    const existingTransaction = await this.transactionRepository.findById(id);
    if (!existingTransaction) {
      throw new NotFoundException('Transaction with ID not found.');
    }

    return TransactionMapper.toResponse(await this.transactionRepository.save({ 
      transactionId: id, 
      account: existingTransaction.account,
      category: existingTransaction.category,
      user: existingTransaction.user,
      creditCard: existingTransaction.creditCard,
      ...request,
     }));
  }
}