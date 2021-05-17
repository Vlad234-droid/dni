import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Button from '@beans/button';
import Icon from '@beans/icon';

import useFetch from 'hooks/useFetch';
import { useMedia } from 'context/InterfaceContext';
import Loading from 'types/loading';
import { Spinner } from 'features/Common';

export type Data = {
  elements: Record<string, Record<'color', string>>;
};

type Props = {
  data: Data;
  type: string;
};

const Chart = ({ data, type }: Props) => {
  const { isDesktop, isTablet } = useMedia();

  const [{ response, loading }, doFetch] = useFetch<Blob>();
  const isLoading = useMemo(() => loading === Loading.PENDING, [loading]);

  useEffect(() => {
    if (response && !isLoading) {
      const file = window.URL.createObjectURL(response);
      window.open(file, '_blank');
    }
  }, [response, isLoading]);

  const openPDF = useCallback(() => {
    doFetch(
      (api) =>
        api.report.printPdf({
          page: window.location.href,
          format: 'a4',
          landscape: true,
        }),
      (res) => res,
    );
  }, []);

  if (loading === Loading.PENDING) return <Spinner height='300px' />;

  return (
    <div>
      <ButtonWrapper>
        <div>
          <Button>
            <Icon graphic='download' onClick={openPDF} />
          </Button>
        </div>
      </ButtonWrapper>
      <AreaChart
        width={isDesktop ? 750 : isTablet ? 700 : 320}
        height={264}
        // @ts-ignore
        data={data[type]}
        barSize={4}
        barGap={0.5}
        barCategoryGap={8}
        margin={{ top: 28 }}
        style={{
          fontFamily: 'Noto Sans',
          fontSize: '12px',
          fill: '#ccc',
        }}
      >
        <defs>
          {Object.entries(data.elements).map(([key, value], idx) => {
            return (
              <linearGradient
                key={key}
                id={`color_${idx}`}
                x1='0.000134018'
                y1='-172.527'
                x2='0.000134018'
                y2='184.613'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor={value.color} />
                <stop offset={1} stopColor={value.color} stopOpacity={0.1} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid
          stroke='#E5E5E5'
          strokeDasharray='2 2'
          vertical={false}
        />
        <XAxis
          dataKey='name'
          tickLine={false}
          tick={{
            fontSize: 11,
          }}
        />
        <YAxis type='number' domain={[0, 10]} tickCount={6} tickLine={false} />
        <Tooltip />
        {Object.entries(data.elements).map(([key, value], idx) => (
          <Area
            key={key}
            type='monotone'
            dataKey={key}
            radius={24}
            fill={`url(#color_${idx})`}
            stroke={value.color}
            fillOpacity={1}
          />
        ))}
      </AreaChart>
    </div>
  );
};

export default Chart;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 18px;
`;
