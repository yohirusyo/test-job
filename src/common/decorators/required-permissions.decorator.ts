import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/user/entities/user.entity';

export const RequiredPermission = (...roles: ROLE[]) =>
  SetMetadata('requiredPermission', roles);
