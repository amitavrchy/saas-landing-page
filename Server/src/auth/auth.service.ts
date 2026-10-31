import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthUser } from './decorators/current-user.decorator.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const baseSlug = dto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40) || 'workspace';
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

    const created = await this.prisma.user.create({
      data: { email, passwordHash, name: dto.name },
      select: { id: true, email: true, name: true, role: true },
    });
    const org = await this.prisma.organization.create({
      data: { name: `${dto.name}'s workspace`, slug },
    });
    await this.prisma.membership.create({
      data: {
        userId: created.id,
        organizationId: org.id,
        role: 'owner',
      },
    });
    const user = created;

    return this.tokenResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return this.tokenResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }

  me(user: AuthUser) {
    return user;
  }

  private tokenResponse(user: AuthUser) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { accessToken, user };
  }
}