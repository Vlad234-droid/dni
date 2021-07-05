import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '@beans/button';
import Icon from '@beans/icon';

import useFetch from 'hooks/useFetch';
import Loading from 'types/loading';

export type Data = {
  elements: Record<string, Record<'color', string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entities: any[];
};

type Props = {
  data: Data;
};

const AreaChartContainer = ({ data }: Props) => {
  const [{ response, loading }, doFetch] = useFetch<Blob>();
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

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

  return (
    <div>
      <ButtonWrapper>
        <div>
          <Button>
            <Icon graphic='download' onClick={openPDF} />
          </Button>
        </div>
      </ButtonWrapper>
      <ResponsiveContainer height={400} width={'95%'}>
        <AreaChart
          data={data.entities}
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
          <CartesianGrid stroke='#E5E5E5' strokeDasharray='2 2' vertical={false} />
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
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartContainer;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 18px;
`;
