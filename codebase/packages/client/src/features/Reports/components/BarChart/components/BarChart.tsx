import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, ResponsiveContainer } from 'recharts';

type Props = {
  data: any;
};

const BarChartContainer = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={700} width={'96%'}>
      <BarChart
        barGap={0.5}
        barCategoryGap={8}
        style={{
          fontSize: '12px',
          fill: '#ccc',
        }}
        layout='vertical'
        data={data.elements}
      >
        <CartesianGrid strokeDasharray={'3 3'} />
        <YAxis type='category' dataKey={'name'} width={80} />
        <XAxis type='number' tick={{ fontFamily: 'sans-serif' }} />
        <Tooltip />
        <Legend />
        {data.entities.map(({ name, color }: { name: string; color: string }) => {
          return (
            <Bar key={name} dataKey={name} fill={color}>
              <LabelList position='inside' content={renderCustomizedLabel} />
            </Bar>
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = (props: {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  value?: string | number;
}) => {
  const { x, y, width, value, height } = props;

  return (
    <g>
      <text
        x={+x! + +width! / 2}
        y={Math.ceil(+y! + +height! / 2) + 1}
        fill='#fff'
        textAnchor='middle'
        dominantBaseline='middle'
      >
        {value == 0 ? '' : value}
      </text>
    </g>
  );
};

export default BarChartContainer;
