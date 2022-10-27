import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export enum Action {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof UserEntity | typeof TaskEntity> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(authenticatedUser: User, id: string) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (authenticatedUser.id === id) {
      can(Action.Read, UserEntity);
      can(Action.Update, UserEntity);
      can(Action.Delete, UserEntity);
      can(Action.Read, TaskEntity);
      can(Action.Update, TaskEntity);
      can(Action.Delete, TaskEntity);
    } else {
      cannot(Action.Read, UserEntity);
      cannot(Action.Update, UserEntity);
      cannot(Action.Delete, UserEntity);
      cannot(Action.Read, TaskEntity);
      cannot(Action.Update, TaskEntity);
      cannot(Action.Delete, TaskEntity);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
