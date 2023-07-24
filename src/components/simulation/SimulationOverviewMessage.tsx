import React from 'react';
import { RecommendedActionType, SimulationMethodType, RiskFactor } from '../../models/simulation/Transaction';

export interface OverviewProps {
  recommendedAction: RecommendedActionType;
  overviewMessage: string;
  method?: SimulationMethodType | string;
  riskFactors: RiskFactor[] | null;
}

export const SimulationOverviewMessage = (props: OverviewProps) => {
  const { recommendedAction, overviewMessage, method, riskFactors } = props;

  function getHeaderColor() {
    switch (recommendedAction) {
      case RecommendedActionType.Block:
        return '#fb4b4b';
      case RecommendedActionType.Warn:
        return '#rgb(251 136 75)';
    }
  }

  function getWarningText() {
    switch (recommendedAction) {
      case RecommendedActionType.Block:
        return 'Danger ahead';
      case RecommendedActionType.Warn:
        return 'Warning';
    }
  }

  if (recommendedAction === RecommendedActionType.None) {
    return <></>;
  }

  const warningText = getWarningText();
  const headerColor = getHeaderColor();

  return <></>;
};
