import React, { useState, useCallback } from 'react';
import DropdownGroup from '@beans/dropdown-group';
import pick from 'lodash.pick';

import Chart from 'features/Chart';
import Diagram from 'features/Diagram';

import { PERIOD, REGION, FORMAT, filtersByPeriod } from '../config/filters';
import { Period } from '../config/types';
import { DropdownWrapper } from './styled';

type Props = {
  active: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const Graphics = ({ active, data }: Props) => {
  const [, setPeriod] = useState<Period>(Period.CURRENT_YEAR);

  const handleFilterChange = useCallback((event) => {
    event.preventDefault();

    const key = event.target.value;

    switch (key) {
      case Period.CURRENT_YEAR:
        setPeriod(Period.CURRENT_YEAR);
        break;

      case Period.LAST_MONTH:
        setPeriod(Period.LAST_MONTH);
        break;

      case Period.LAST_WEEK:
        setPeriod(Period.LAST_WEEK);
        break;

      case Period.PICK_PERIOD:
        setPeriod(Period.PICK_PERIOD);
        break;
    }
  }, []);

  switch (active) {
    case PERIOD:
      return (
        <div data-testid={PERIOD}>
          <DropdownWrapper>
            <DropdownGroup
              defaultSelectedValue={filtersByPeriod[0].title}
              id='graphics'
              labelText='Time Period'
              required
              onChange={handleFilterChange}
            >
              {filtersByPeriod.map(({ title, id }) => (
                <option key={id} value={title}>
                  {title}
                </option>
              ))}
            </DropdownGroup>
          </DropdownWrapper>
          <Chart type={'entities'} data={pick(data, ['elements', 'entities'])} />
        </div>
      );
    case REGION:
      return (
        <div data-testid={REGION}>
          <Diagram type={'regions'} data={pick(data, ['elements', 'regions'])} />
        </div>
      );
    case FORMAT:
      return (
        <div data-testid={FORMAT}>
          <Diagram type={'formats'} data={pick(data, ['elements', 'formats'])} />
        </div>
      );
    default:
      return null;
  }
};

export default Graphics;
