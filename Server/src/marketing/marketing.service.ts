import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DemoRequestDto, SubscriberDto, WaitlistDto } from './dto/waitlist.dto.js';

@Injectable()
export class MarketingService {
  constructor(private readonly prisma: PrismaService) {}

  async joinWaitlist(dto: WaitlistDto) {
    const email = dto.email.toLowerCase();
    try {
      const entry = await this.prisma.waitlistEntry.create({
        data: { email, name: dto.name, company: dto.company },
      });
      return { ok: true, id: entry.id };
    } catch {
      throw new ConflictException('Email already on the waitlist');
    }
  }

  async subscribe(dto: SubscriberDto) {
    const email = dto.email.toLowerCase();
    const entry = await this.prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    return { ok: true, id: entry.id };
  }

  async requestDemo(dto: DemoRequestDto) {
    const entry = await this.prisma.demoRequest.create({
      data: {
        name: dto.name,
        email: dto.email.toLowerCase(),
        company: dto.company,
        message: dto.message,
      },
    });
    return { ok: true, id: entry.id };
  }

  listBlog() {
    return this.prisma.blogPost.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        authorName: true,
        tags: true,
      },
    });
  }

  async getBlog(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post || !post.publishedAt) throw new NotFoundException('Post not found');
    return post;
  }

  listChangelog() {
    return this.prisma.changelogEntry.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  }
}