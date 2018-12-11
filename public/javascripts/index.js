$(document).ready(function () {

  var timeData = [],

    elevatorSineData = [],

    cabinPosData = [],

    doorStatePos1Data = [],

    doorStatePos2Data = [],
    doorDrvPhsData = [];

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
  
  var drivePhasedata = {

    labels:timeData,

    datasets: [

      {

        fill: false,

        label:'Elevator Drive Phase',

        yAxisID: 'drivePhase',

        borderColor: "rgba(255, 204, 0, 1)",

        pointBoarderColor: "rgba(255, 204, 0, 1)",

        backgroundColor: "rgba(255, 204, 0, 0.4)",

        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",

        pointHoverBorderColor: "rgba(255, 204, 0, 1)",

        data: doorDrvPhsData

      }
    ]

  }


  var basicOption = {

    title: {

      display: true,

      text: 'Elevator Real-time Data',

      fontSize: 16

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

      fontSize: 16

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

                      beginAtZero: false,

                      min:0,

                      max:5,

                      stepSize : 1,

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

                      beginAtZero: false,

                      min:0,

                      max:5,

                      stepSize : 1,

                      callback: function(value, index, values) {

                          return yLabels[value];

                      }

          }

      }

    ]

    }

  }
  
  var basicOption3 = {

    title: {

      display: true,

      text: 'Elevator Real-time Drive Phase Data',

      fontSize: 16

    },

    scales: {
      yAxes: [
      {

          id: 'drivePhase',

          type: 'linear',

          scaleLabel: {

            labelString: 'Door Drive Phase',

            display: true

          },

          position: 'left',

          ticks: {

                      beginAtZero: false,

                      min:0,

                      max:3,

                      stepSize : 1,

                      callback: function(value, index, values) {

                          return yLabels2[value];

                      }

          }

      }

        ]

    }

  }

  var yLabels = {
     1 : 'Opening', 2 : 'Closing',  3 : 'Opened', 4 : 'Closed', 5 :'Locked'
  }
  
  var yLabels2 = {
    1 : 'Acceleration', 2 : 'FullSpeed',  3 : 'Standing', 4 : 'Braking'
  }

  //Get the context of the canvas element we want to select

  var ctx = document.getElementById("myChart").getContext("2d");
  var ctx2 = document.getElementById("myChart2").getContext("2d");
  var ctx3 = document.getElementById("myChart3").getContext("2d");

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
  var myLineChart3 = new Chart(ctx3, {

    type: 'line',

    data: drivePhasedata,

    options: basicOption3

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
  
  
  if(obj.doorStatePos1) {
    if(obj.doorStatePos1 === 'Opening') {
      doorStatePos1Data.push(1);
    }
    else if(obj.doorStatePos1 === 'Closing') {
      doorStatePos1Data.push(2);  
    }
    else if(obj.doorStatePos1 === 'Opened') {
      doorStatePos1Data.push(3);  
    }
    else if(obj.doorStatePos1 === 'Closed') {
      doorStatePos1Data.push(4);  
    }
    else if(obj.doorStatePos1 === 'Locked') {
      doorStatePos1Data.push(5);  
    }
   
  }
  
  if(obj.doorStatePos2) {
    if(obj.doorStatePos2 === 'Opening') {
      doorStatePos2Data.push(1);
    }
    else if(obj.doorStatePos2 === 'Closing') {
      doorStatePos2Data.push(2);  
    }
    else if(obj.doorStatePos2 === 'Opened') {
      doorStatePos2Data.push(3);  
    }
    else if(obj.doorStatePos2 === 'Closed') {
      doorStatePos2Data.push(4);  
    }
    else if(obj.doorStatePos2 === 'Locked') {
      doorStatePos2Data.push(5);
    }
  }

  if(obj.drivePhase) {
    if(obj.drivePhase === 'Acceleration') {
      doorDrvPhsData.push(1);
    }
    else if(obj.drivePhase === 'FullSpeed') {
      doorDrvPhsData.push(2);
    }
    else if(obj.drivePhase === 'Standing') {
      doorDrvPhsData.push(3);
    }
    else if(obj.drivePhase === 'Braking') {
      doorDrvPhsData.push(4);
    }

  }

  myLineChart.update();
  myLineChart2.update();
  myLineChart3.update();

  } catch (err) {
    console.error(err);
  }

  }

});