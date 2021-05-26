import { PieChart, Pie, Tooltip } from 'recharts';
import { useMedia } from 'context/InterfaceContext';
import { ViewportSize } from 'config/constants';

export type Data = {
  elements: Record<string, Record<'color', string>>;
};

type Props = {
  data: Data;
  type: string;
};

const Diagram = ({ data, type }: Props) => {
  const { isDesktop, isTablet, gte } = useMedia();
  const elements = Object.entries(data.elements);
  const isTabletOrMore = gte(ViewportSize.TABLET);

  return (
    <PieChart
      width={isDesktop ? 730 : isTablet ? 640 : 300}
      height={(isTabletOrMore ? 200 : 100) * elements.length + 70}
    >
      {elements.map(([key, value], idx) => (
        <Pie
          key={key}
          // @ts-ignore
          data={data[type]}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={(isTabletOrMore ? 100 : 50) * (idx + 1)}
          innerRadius={(isTabletOrMore ? 100 : 50) * idx}
          fill={value.color}
          label
        />
      ))}
      <Tooltip />
    </PieChart>
  );
};

export default Diagram;
