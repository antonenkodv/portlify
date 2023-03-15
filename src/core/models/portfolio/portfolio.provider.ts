import { PORTFOLIO_REPOSITORY } from '../../constants';
import { Portfolio } from './portfolio.model';

export const PortfolioProviders = [
  {
    provide: PORTFOLIO_REPOSITORY,
    useValue: Portfolio,
  },
];
