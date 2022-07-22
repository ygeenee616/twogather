import {
  Controller,
  Get,
  Header,
  Param,
  Req,
  Res,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const apiDocs = 'http://localhost:3000/api-docs';
    return `
    <div><H1>Twogather Backend API</H1></div>
    Welcome to visit the Twogather Backend API Home.<br>
    Please click <a href=${apiDocs}>here</a> want to see the api-docs.
    
    `;
  }
}
