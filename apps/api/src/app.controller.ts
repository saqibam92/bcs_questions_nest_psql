// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Health check route from your original server.js
  @Get('/health')
  getHealth() {
    return { 
      status: "OK", 
      timestamp: new Date().toISOString() 
    };
  }
}