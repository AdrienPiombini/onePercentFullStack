import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

const REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const PASSWORD_MESSAGE =
  'password need 1 upper case, lowercase, number and special character';

export class RegisterUserDto {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  @Matches(REGEX, {
    message: PASSWORD_MESSAGE,
  })
  password: string;
}
