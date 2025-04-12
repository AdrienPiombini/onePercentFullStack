import { v4 } from 'uuid';
import { BaseEntity } from '../persistence/BaseEntity';

export interface UserProperties {
  id: string;
  firstname: string;
  lastname: string;
  email?: string;
  password: string;
  identity: Identity;
}

export type Identity = {
  fullName: string;
};

export class User implements BaseEntity<UserProperties> {
  constructor(
    public readonly id: string,
    public readonly props: UserProperties,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: UserProperties): User {
    return new User(v4(), props, new Date(), new Date());
  }

  static validate(props: Partial<UserProperties>): boolean {
    const havePassword = !!props.password && props.password.length > 0;
    const haveName = !!props.firstname && props.firstname.length > 0;
    const haveLastname = !!props.lastname && props.lastname.length > 0;

    if (!havePassword || !haveName || !haveLastname) {
      return false;
    }

    return true;
  }

  static generateUniqueId(name: string): string {
    return name;
  }

  static restore(user: User): User {
    return {
      id: user.id,
      props: user.props,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
