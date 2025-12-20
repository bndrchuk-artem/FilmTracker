import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Email користувача",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "SecurePassword123",
    description: "Пароль (мінімум 6 символів)",
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "John Doe",
    description: "Повне ім'я користувача",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
