export class UserResponseDto {
  id!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class UpdateUserDto {
  email?: string;
}
