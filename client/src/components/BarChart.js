import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = ({ data, colors /* see data tab */ }) => {
  return (
    <ResponsiveBar
      data={data}
      keys={['monthlyTotal', colors]}
      indexBy='month'
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat=' >-$.2~f'
      colors={colors}
      // defs={[
      //   {
      //     id: 'dots',
      //     type: 'patternDots',
      //     background: 'inherit',
      //     color: '#38bcb2',
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: 'lines',
      //     type: 'patternLines',
      //     background: 'inherit',
      //     color: '#eed312',
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: 'fries',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'sandwich',
      //     },
      //     id: 'lines',
      //   },
      // ]}
      // borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      enableGridY={false}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      role='application'
      ariaLabel='Monthly Breakdown'
    />
  );
};

export default BarChart;
