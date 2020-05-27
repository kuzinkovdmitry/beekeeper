import * as Highcharts from 'highcharts';

export const CHART_CONFIG: Highcharts.Options = {
  chart: {
    type: 'column',
    backgroundColor: '#ffda47',
    height: 500,
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  xAxis: {
    categories: [],
    crosshair: {
      width: 1,
      color: '#000000',
      dashStyle: 'Solid',
      zIndex: 3
    },
    labels: {
      style: {
        color: '#000000',
        fontSize: '14px',
        fontFamily: 'Roboto'
      }
    },
    gridLineWidth: 1,
    gridLineDashStyle: 'Solid',
    gridLineColor: '#ff9900',
    tickColor: 'transparent',
    lineColor: '#ff9900',
  },
  yAxis: {
    plotLines: [{
      color: '#000000',
      width: 2,
      value: 0
    }],
    labels: {
      style: {
        color: '#000000',
        fontSize: '14px',
        fontFamily: 'Roboto'
      }
    },
    title: {
      text: '',
    },
    gridLineWidth: 1,
    gridLineDashStyle: 'Solid',
    gridLineColor: '#ff9900',
    tickColor: 'transparent',
    lineColor: '#ff9900',
  },
  series: [],
  tooltip: {
    backgroundColor: '#ff9900',
    borderRadius: 5,
    borderWidth: 0,
    style: {
      color: '#ffffff',
      fontSize: '12px',
      fontFamily: 'Roboto',
      opacity: 0.9
    },
    followPointer: false,
    shared: true,
    headerFormat: '',
    useHTML: true
  }
};
