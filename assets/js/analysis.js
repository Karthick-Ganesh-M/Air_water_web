
// AREA CHART
var areaChartOptions = {
  series: [
    {
      name: 'PM 2.5',
      data: [0,0,0,0],
    },
    {
      name: 'NH3',
      data: [0,0,0,0],
    },
    {
      name: 'PM10',
      data: [0,0,0,0],
    },
    {
      name: 'CO',
      data: [0,0,0,0],
    }
  ],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 450,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['red', 'yellow','green',"blue"],
  labels: ['0', '5', '10', '15', '20', '25', '30'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#111',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#111',
      },
    },
    
      title: {
        text: 'Time',
        style: {
          color: '#111',
        },
      },
      labels: {
        style: {
          colors: ['#111'],
        },
      },
  },
  yaxis: [
    {
      title: {
        text: 'PPM',
        style: {
          color: '#111',
        },
      },
      labels: {
        style: {
          colors: ['#111'],
        },
      },
    },
    
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};

  
    

    //for testing purpose only
    
  // areaChartOptions.series[0].data[0]=270;
  // areaChartOptions.series[1].data[0]=511;
  // areaChartOptions.series[2].data[0]=780;
  // areaChartOptions.series[3].data[0]=592;



  var today=new Date();
  var str=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+":"+today.getMilliseconds();

  times=[];

function loadSession(){
  let data=sessionStorage.getItem("time")||{};
  console.log(data);
  if(data.length>0){
      data=JSON.parse(data);

      times[0]=data.t1;
      times[1]=data.t2;

      
      areaChartOptions.series[0].data[1]=data.a1;
      areaChartOptions.series[0].data[2]=data.a2;
      areaChartOptions.series[0].data[3]=data.a3;

      areaChartOptions.series[1].data[1]=data.b1;
      areaChartOptions.series[1].data[2]=data.b2;
      areaChartOptions.series[1].data[3]=data.b3;

      areaChartOptions.series[2].data[1]=data.c1;
      areaChartOptions.series[2].data[2]=data.c2;
      areaChartOptions.series[2].data[3]=data.c3;
      
      areaChartOptions.series[3].data[1]=data.d1;
      areaChartOptions.series[3].data[2]=data.d2;
      areaChartOptions.series[3].data[3]=data.d3;
  }
}





loadSession();


setTimeout(()=>{
  const formData=JSON.parse(sessionStorage.getItem("time"))||{};

  
  formData.t3=times[1];
  formData.t2=times[0];
  formData.t1=str;

  formData.a3=areaChartOptions.series[0].data[2];
  formData.a2=areaChartOptions.series[0].data[1];
  formData.a1=areaChartOptions.series[0].data[0];

  formData.b3=areaChartOptions.series[1].data[2];
  formData.b2=areaChartOptions.series[1].data[1];
  formData.b1=areaChartOptions.series[1].data[0];

  formData.c3=areaChartOptions.series[2].data[2];
  formData.c2=areaChartOptions.series[2].data[1];
  formData.c1=areaChartOptions.series[2].data[0];
  
  formData.d3=areaChartOptions.series[3].data[2];
  formData.d2=areaChartOptions.series[3].data[1];
  formData.d1=areaChartOptions.series[3].data[0];
  
  
  sessionStorage.setItem("time", JSON.stringify(formData));

  
  location.reload();
  loadSession();
  

},5000);




var areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();




    