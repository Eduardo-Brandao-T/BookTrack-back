export class UserEntity {
  id: number;
  email: string;
  name?: string;
  gender?: string;
  birthDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
