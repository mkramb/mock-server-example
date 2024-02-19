import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

const DEFAULT_COUNT = 3;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/facts')
  getHello(@Query('count') count?: number) {
    return this.appService.getFacts(count ?? DEFAULT_COUNT);
  }
}
