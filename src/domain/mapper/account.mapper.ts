import { Account } from "../model/account.entity";
import { AccountResponse } from "src/adapters/model/response/account-response.dto";

export class AccountMapper {
  static toResponse(entity: Account): AccountResponse {
    const response = new AccountResponse();
    response.accountId = entity?.accountId
    response.name = entity?.name
    response.initialAmount = entity?.initialAmount

    return response;
  }
}