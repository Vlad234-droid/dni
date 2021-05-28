import { FC, useCallback, useEffect, useState } from 'react';
import filter from 'lodash.filter';
import keyBy from 'lodash.keyby';

import Statistics from 'features/Statistics';

import { chartData, statisticsData } from '../config/data';
import Graphics from './Graphics';

export const REPORT_TEST_ID = 'report-component';

type Props = {
  showed: string;
};

const Reports: FC<Props> = ({ showed }: Props) => {
  const [chart, updateChar] = useState(chartData);
  const [statistics, updateStatistics] = useState(statisticsData);

  useEffect(() => {
    updateChar({
      ...chart,
      elements: keyBy(filter(statistics, ['checked', true]), (o) => o.name),
    });
  }, [statistics]);

  const handleUpdateStatistics = useCallback(
    (id: string, checked: boolean) => {
      updateStatistics(
        statistics.map((item) =>
          item.id === id ? { ...item, checked } : item,
        ),
      );
    },
    [statistics],
  );

  return (
    <div data-testid={REPORT_TEST_ID}>
      <Graphics active={showed} data={chart} />
      <Statistics data={statistics} onChange={handleUpdateStatistics} />
    </div>
  );
};

export default Reports;
