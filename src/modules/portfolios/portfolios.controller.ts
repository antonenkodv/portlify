import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../core/decorators/current.user.decorator';
import { User } from '../../core/models/user/user.model';
import { CreatePortfolioDto } from './dto/create.portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private portfoliosService: PortfoliosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@CurrentUser() user: User, @Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfoliosService.create(user, createPortfolioDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@CurrentUser() user: User) {
    return this.portfoliosService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@CurrentUser() user: User, @Param('id') portfolioId: number) {
    return this.portfoliosService.findOne(user, portfolioId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async destroy(@CurrentUser() user: User, @Param('id') portfolioId: number) {
    const result = await this.portfoliosService.destroy(user, portfolioId);
    return !!result;
  }
}
