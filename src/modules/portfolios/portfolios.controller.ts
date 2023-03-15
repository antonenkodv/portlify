import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {CurrentUser} from "../../core/decorators/current.user.decorator";
import {User} from "../../core/models/user/user.model";
import {CreatePortfolioDto} from "./dto/create.portfolio.dto";
import {PortfoliosService} from "./portfolios.service";

@Controller('portfolios')
export class PortfoliosController {

    constructor(private portfoliosService : PortfoliosService) {

    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@CurrentUser() user: User,
        @Body() createPortfolioDto: CreatePortfolioDto) {
            return this.portfoliosService.create(user,createPortfolioDto)
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(@CurrentUser() user: User) {
        return this.portfoliosService.findAll(user)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(@CurrentUser() user: User,
            @Query('id') portfolioId:string ) {
        return this.portfoliosService.findOne(user, portfolioId)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    destroy(@CurrentUser() user: User,
            @Query('id') portfolioId:string ) {
        return this.portfoliosService.destroy(user,portfolioId)
    }
}