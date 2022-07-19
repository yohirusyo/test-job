import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredPermission } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards';
import { ROLE } from 'src/user/entities/user.entity';
import { ParserService } from './parser.service';

@ApiTags('Working with parser')
@Controller()
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @ApiOperation({ summary: 'Start parsing' })
  @ApiResponse({
    status: 200,
    description: 'Success returns { "message": "success" }',
  })
  @ApiResponse({ status: 400, description: 'Already started' })
  @RequiredPermission(ROLE.ADMIN)
  @UseGuards(RoleGuard)
  @Get('/startParse')
  startParse() {
    return this.parserService.startParse();
  }

  @ApiOperation({ summary: 'Stop parsing' })
  @ApiResponse({
    status: 200,
    description: 'Success returns { "message": "success" }',
  })
  @ApiResponse({ status: 400, description: 'Already stopped' })
  @RequiredPermission(ROLE.ADMIN)
  @UseGuards(RoleGuard)
  @Get('/stopParse')
  stopParse() {
    return this.parserService.stopParse();
  }
}
