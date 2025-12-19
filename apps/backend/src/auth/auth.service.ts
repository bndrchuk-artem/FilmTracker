import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryStorage } from '../common/storage/in-memory.storage';
import { User } from '../common/entities/user.entity';
import { RegisterDto } from '../common/dto/register.dto';
import { LoginDto } from '../common/dto/login.dto';

@Injectable()
export class AuthService {
  private usersStorage = new InMemoryStorage<User>();

  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = this.usersStorage.find(
      (user) => user.email === registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user: User = {
      id: uuidv4(),
      email: registerDto.email,
      passwordHash,
      name: registerDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.usersStorage.set(user.id, user);

    // Генерація JWT токена
    const accessToken = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.usersStorage.find(
      (user) => user.email === loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      accessToken,
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    const user = this.usersStorage.get(userId);
    return Promise.resolve(user ?? null);
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: User) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}
