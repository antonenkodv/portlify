import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import {PortfolioProviders} from "../../core/models/portfolio/portfolio.provider";


@Module({
  providers: [PortfoliosService,...PortfolioProviders],
  controllers: [PortfoliosController]
})
export class PortfoliosModule {}
