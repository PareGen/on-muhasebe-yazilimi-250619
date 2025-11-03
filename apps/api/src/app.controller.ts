import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'SaaS Template API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
