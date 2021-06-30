import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { useMedia } from 'context/InterfaceContext';

type Props = {
  data: any;
};

const BarChartContainer = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={700} width={'95%'}>
      <BarChart
        barGap={0.5}
        barCategoryGap={8}
        style={{
          fontFamily: 'Noto Sans',
          fontSize: '12px',
          fill: '#ccc',
        }}
        layout='vertical'
        data={data.elements}
      >
        <CartesianGrid strokeDasharray={'3 3'} />
        <YAxis dataKey={'name'} type='category' />
        <XAxis type='number' />
        <Tooltip />
        <Legend />
        {data.entities.map(({ name, color }: { name: string; color: string }) => {
          return <Bar key={name} dataKey={name} fill={color} />;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartContainer;
