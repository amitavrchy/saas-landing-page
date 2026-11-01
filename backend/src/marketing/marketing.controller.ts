import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DemoRequestDto, SubscriberDto, WaitlistDto } from './dto/waitlist.dto.js';
import { MarketingService } from './marketing.service.js';

@Controller()
export class MarketingController {
  constructor(private readonly marketing: MarketingService) {}

  @Post('waitlist')
  waitlist(@Body() dto: WaitlistDto) {
    return this.marketing.joinWaitlist(dto);
  }

  @Post('subscribers')
  subscribers(@Body() dto: SubscriberDto) {
    return this.marketing.subscribe(dto);
  }

  @Post('demo-requests')
  demo(@Body() dto: DemoRequestDto) {
    return this.marketing.requestDemo(dto);
  }

  @Get('blog')
  blog() {
    return this.marketing.listBlog();
  }

  @Get('blog/:slug')
  blogOne(@Param('slug') slug: string) {
    return this.marketing.getBlog(slug);
  }

  @Get('changelog')
  changelog() {
    return this.marketing.listChangelog();
  }
}