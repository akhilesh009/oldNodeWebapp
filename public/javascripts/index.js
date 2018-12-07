$(document).ready(function () {
  var timeData = [],
    elevatorSineData = [],
    cabinPosData = [],
    doorStatePos1Data = [],
    doorStatePos2Data = [];
  var data = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Elevator Sine',
        yAxisID: 'elevatorSine',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: elevatorSineData
      },
      {
        fill: false,
        label: 'Elevator Cabin Position',
        yAxisID: 'cabinPos',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: cabinPosData
      }
    ]
  }
  var doorPosdata = {
    labels:timeData,
    datasets: [
      {
        fill: false,
        label:'Door State Position 1',
        yAxisID: 'doorStatePos1',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: doorStatePos1Data
      },
      {
        fill: false,
        label: 'Door State Position 2',
        yAxisID: 'doorStatePos2',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: doorStatePos2Data
      }
    ]
  }

  var basicOption = {
    title: {
      display: true,
      text: 'Elevator Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'elevatorSine',
        type: 'linear',
        scaleLabel: {
          labelString: 'Elevator Sine',
          display: true
        },
        position: 'left',
      }, {
          id: 'cabinPos',
          type: 'linear',
          scaleLabel: {
            labelString: 'Elevator Cabin Position',
            display: true
          },
          position: 'right'
        }]
    }
  }
  
  var basicOption2 = {
    title: {
      display: true,
      text: 'Elevator Real-time Door Position Data',
      fontSize: 24
    },
    scales: {
      yAxes: [
      {
        id: 'doorStatePos1',
        type: 'linear',
        labels:["Opening","Closing", "Opened", "Closed", "Locked"],
        scaleLabel: {
          labelString: 'Door State Position 1',
          display: true
        },
        position: 'left',
        ticks: {
                      callback: function(value, index, values) {
                          return yLabels[value];
                      }
        }
      }, 
      {
          id: 'doorStatePos2',
          type: 'linear',
          labels : ["Opening","Closing", "Opened", "Closed", "Locked"],
          scaleLabel: {
            labelString: 'Door State Position 2',
            display: true
          },
          position: 'right',
          ticks: {
                      callback: function(value, index, values) {
                          return yLabels[value];
                      }
      }
      // {
        // ticks: {
                      // callback: function(value, index, values) {
                          // return yLabels[value];
                      // }
        // }
      }
        ]
    }
  }

  var yLabels = {
    0 : 'Opening', 0.5 : 'Closing',  1.0: 'Opened'
  }

  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var ctx2 = document.getElementById("myChart2").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: basicOption
  });
  var myLineChart2 = new Chart(ctx2, {
    type: 'line',
    data: doorPosdata,
    options: basicOption2
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.elevatorSine) {
        return;
      }
      timeData.push(obj.time);
      elevatorSineData.push(obj.elevatorSine);
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        elevatorSineData.shift();
      }

      if (obj.cabinPos) {
        cabinPosData.push(obj.cabinPos);
      }
      if (cabinPosData.length > maxLen) {
        cabinPosData.shift();
      }
      doorStatePos1Data.push(obj.doorStatePos1);
      doorStatePos2Data.push(obj.doorStatePos2);

      myLineChart.update();
      
      myLineChart2.update();
    } catch (err) {
      console.error(err);
    }
  }
});
