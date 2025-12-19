import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from '../common/dto/register.dto';
import { LoginDto } from '../common/dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  @ApiResponse({
    status: 201,
    description: 'Користувач успішно зареєстрований',
  })
  @ApiResponse({ status: 409, description: 'Email вже зареєстрований' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вхід в систему' })
  @ApiResponse({ status: 200, description: 'Успішний вхід' })
  @ApiResponse({ status: 401, description: 'Невірні дані для входу' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Отримання поточного користувача' })
  @ApiResponse({ status: 200, description: 'Дані поточного користувача' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  getMe(@Request() req: Express.Request & { user: unknown }) {
    return req.user;
  }
}
