import { AccountResponse } from "src/adapters/model/response/account-response.dto";

export interface AccountService {
  find(): Promise<AccountResponse[]>
}

export const AccountService = Symbol('AccountService');