import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user-response.dto';

export class LoginResponse {
  @ApiProperty({ example: 'ey4203478032478023', description: 'Logged in user token' })
  token: string;

  @ApiProperty({ type: UserResponse, description: 'Logged in user' })
  user: UserResponse;
}
