import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { useMedia } from 'context/InterfaceContext';
import { ViewportSize } from 'config/constants';

type Props = {
  data: any;
};

const BarChartContainer = ({ data }: Props) => {
  const { isDesktop, isTablet } = useMedia();

  console.log(data);

  return (
    <BarChart
      width={isDesktop ? 750 : isTablet ? 700 : 320}
      height={400}
      barGap={0.5}
      barCategoryGap={8}
      margin={{ top: 138 }}
      style={{
        fontFamily: 'Noto Sans',
        fontSize: '12px',
        fill: '#ccc',
      }}
      data={data.elements}
    >
      <CartesianGrid strokeDasharray={'3 3'} />
      <XAxis dataKey={'name'} />
      <YAxis />
      <Tooltip />
      <Legend />
      {data.entities.map(({ name, color }: { name: string; color: string }) => {
        return <Bar key={name} dataKey={name} fill={color} />;
      })}
    </BarChart>
  );
};

export default BarChartContainer;
