import { ForbiddenException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CaslAbilityFactory } from 'src/modules/auth/casl/casl-ability.factory';

const casl = new CaslAbilityFactory();

export const checkAuthorization = (
  authenticatedUser: User,
  id: string,
  action: string,
  entity: any,
): boolean => {
  const ability = casl.defineAbility(authenticatedUser, id);
  const isAllowed = ability.can(action, entity);
  if (!isAllowed) throw new ForbiddenException('Forbidden access');

  return true;
};
