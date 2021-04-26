import { useMemo, useState } from 'react';
import Chart from 'features/Chart';
import Diagram from 'features/Diagram';
import pick from 'lodash.pick';
import { ButtonGroup } from 'features/Common';
import { PERIOD, REGION, FORMAT } from 'features/Page/components/Reports';

enum Period {
  CURRENT_YEAR,
  LAST_MONTH,
  LAST_WEEK,
  TODAY,
  PICK_PERIOD,
}

type Props = {
  active: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const Graphics = ({ active, data }: Props) => {
  console.log(data);
  const [period, setPeriod] = useState<Period>(Period.CURRENT_YEAR);
  const buttonList = useMemo(() => {
    return [
      {
        title: 'This year',
        action: () => setPeriod(Period.CURRENT_YEAR),
      },
      {
        title: 'Last month',
        action: () => setPeriod(Period.LAST_MONTH),
      },
      {
        title: 'Last week',
        action: () => setPeriod(Period.LAST_WEEK),
      },
      {
        title: 'Today',
        action: () => setPeriod(Period.TODAY),
      },
      {
        title: 'Pick period',
        action: () => setPeriod(Period.PICK_PERIOD),
      },
    ];
  }, []);

  switch (active) {
    case PERIOD:
      return (
        <div data-testid={PERIOD}>
          <ButtonGroup list={buttonList} activeIndex={period} />
          <Chart
            type={'entities'}
            data={pick(data, ['elements', 'entities'])}
          />
        </div>
      );
    case REGION:
      return (
        <div data-testid={REGION}>
          <Diagram
            type={'regions'}
            data={pick(data, ['elements', 'regions'])}
          />
        </div>
      );
    case FORMAT:
      return (
        <div data-testid={FORMAT}>
          <Diagram
            type={'formats'}
            data={pick(data, ['elements', 'formats'])}
          />
        </div>
      );
    default:
      return null;
  }
};

export default Graphics;
