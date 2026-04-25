import { useAppDispatch, useAppSelector } from "@/store";
import { selectPortfolio } from "@/store/slices/portfolioSlice";
import { useGetPortfoliosQuery, useGetHoldingsQuery } from "@/store/api/portfolioApi";
import type { Portfolio } from "@/types/portfolio";

export function usePortfolio() {
  const dispatch = useAppDispatch();
  const { selected, holdings } = useAppSelector((s) => s.portfolio);
  const { data: portfolios = [], isLoading } = useGetPortfoliosQuery();
  const { data: currentHoldings = [] } = useGetHoldingsQuery(selected?.id ?? "", {
    skip: !selected,
  });

  const totalValue = currentHoldings.reduce((sum, h) => sum + h.currentValue, 0);

  function select(portfolio: Portfolio) {
    dispatch(selectPortfolio(portfolio));
  }

  return {
    portfolios,
    selected,
    holdings: currentHoldings.length > 0 ? currentHoldings : holdings,
    totalValue,
    isLoading,
    select,
  };
}
