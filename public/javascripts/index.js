$(document).ready(function () {

$('.nav ul li:first').addClass('active');
    $('.tab-content:not(:first)').hide();
    $('.nav ul li a').click(function (event) {
        event.preventDefault();
        var content = $(this).attr('href');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $(content).show();
        $(content).siblings('.tab-content').hide();
    });

  var timeData = [],

    elevatorSineData = [],

    cabinPosData = [],

    doorStatePos1Data = [],

    doorStatePos2Data = [],
    doorDrvPhsData = [];

  // For dashboard elevatorsine and cabinpos
  var data = {

    labels: timeData,

    datasets: [

      {

        fill: false,

        label: 'Sine Value',

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

        label: 'Cabin Position',

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

  
  // for dashboard door position data
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
  
  
  // for dashboard drive phase data
  var drivePhasedata = {

    labels:timeData,

    datasets: [

      {

        fill: false,

        label:'Drive Phase',

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
  
  // For cabinpos data menubar
  var cabinPosMenudata = {

    labels: timeData,

    datasets: [

      {

        fill: false,

        label: 'Sine Value',

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

        label: 'Cabin Position',

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
  
  // for menu door position data
  var doorPosMenudata = {

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
  
  
  // for menu drive phase data
  var drivePhasedataMenu = {

    labels:timeData,

    datasets: [

      {

        fill: false,

        label:'Drive Phase',

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
    responsive:false,
    maintainAspectRatio: false,
    title: {

      display: true,


      text: 'Sine and Cabin Position Data',

      fontSize: 16

    },

    scales: {

      yAxes: [{

        id: 'elevatorSine',

        type: 'linear',

        scaleLabel: {

          labelString: 'Sine Value',

          display: true

        },

        position: 'left',

      }, {

          id: 'cabinPos',

          type: 'linear',

          scaleLabel: {

            labelString: 'Cabin Position',

            display: true

          },

          position: 'right'

        }]

    }

  }
  
  

  var basicOption2 = {
    responsive:false,
    maintainAspectRatio: false,
    title: {

      display: true,

      text: 'Door Position Data',

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

                      beginAtZero: true,

                      min:0,

                      max:4,

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

                      beginAtZero: true,

                      min:0,

                      max:4,

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
    responsive:false,
    maintainAspectRatio: false,
    title: {

      display: true,

      text: 'Drive Phase Data',

      fontSize: 16

    },

    scales: {
      yAxes: [
      {

          id: 'drivePhase',

          type: 'linear',

          scaleLabel: {

            labelString: 'Drive Phase',

            display: true

          },

          position: 'left',

          ticks: {

                      beginAtZero: true,

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
  
  var basicOption4 = {
    responsive:false,
    maintainAspectRatio: false,
    title: {

      display: true,

      text: 'Sine and Cabin Position Data',

      fontSize: 16

    },

    scales: {

      yAxes: [{

        id: 'elevatorSine',

        type: 'linear',

        scaleLabel: {

          labelString: 'Sine Value',

          display: true

        },

        position: 'left',

      }, {

          id: 'cabinPos',

          type: 'linear',

          scaleLabel: {

            labelString: 'Cabin Position',

            display: true

          },

          position: 'right'

        }]

    }

  }
  
  var basicOption5 = {
    responsive:false,
    maintainAspectRatio: false,
    title: {

      display: true,

      text: 'Door Position Data',

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

                      beginAtZero: true,

                      min:0,

                      max:4,

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

                      beginAtZero: true,

                      min:0,

                      max:4,

                      stepSize : 1,

                      callback: function(value, index, values) {

                          return yLabels[value];

                      }

          }

      }

    ]

    }

  }
  
  var basicOption6 = {
    
    title: {

      display: true,

      text: 'Drive Phase Data',

      fontSize: 16

    },

    scales: {
      yAxes: [
      {

          id: 'drivePhase',

          type: 'linear',

          scaleLabel: {

            labelString: 'Drive Phase',

            display: true

          },

          position: 'left',

          ticks: {

                      beginAtZero: true,

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
     // 1 : 'Opening', 2 : 'Closing',  3 : 'Opened', 4 : 'Closed', 5 :'Locked'
     0 : 'Opening', 1 : 'Closing',  2 : 'Opened', 3 : 'Closed', 4 :'Locked'
     
  }
  
  var yLabels2 = {
    0 : 'Acceleration', 1 : 'FullSpeed',  2 : 'Standing', 3 : 'Braking'
  }

  //Get the context of the canvas element we want to select

  var ctx = document.getElementById("myChart").getContext("2d");
  var ctx2 = document.getElementById("myChart2").getContext("2d");
  var ctx3 = document.getElementById("myChart3").getContext("2d");
  var ctx4 = document.getElementById("myChart4").getContext("2d");
  var ctx5 = document.getElementById("myChart5").getContext("2d");
  var ctx6 = document.getElementById("myChart6").getContext("2d");

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
   
   // for menu charts
   var myLineChart4 = new Chart(ctx4, {

     type: 'line',

     data: cabinPosMenudata,

     options: basicOption4

   });
   var myLineChart5 = new Chart(ctx5, {

     type: 'line',

     data: doorPosMenudata,

     options: basicOption5

   });

   var myLineChart6 = new Chart(ctx6, {

     type: 'line',

     data: drivePhasedataMenu,

     options: basicOption6

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
      doorStatePos1Data.push(0);
    }
    else if(obj.doorStatePos1 === 'Closing') {
      doorStatePos1Data.push(1);  
    }
    else if(obj.doorStatePos1 === 'Opened') {
      doorStatePos1Data.push(2);  
    }
    else if(obj.doorStatePos1 === 'Closed') {
      doorStatePos1Data.push(3);  
    }
    else if(obj.doorStatePos1 === 'Locked') {
      doorStatePos1Data.push(4);  
    }
   
  }
  if (doorStatePos1Data.length > maxLen) {
        doorStatePos1Data.shift();
  }

  if(obj.doorStatePos2) {
    if(obj.doorStatePos2 === 'Opening') {
      doorStatePos2Data.push(0);
    }
    else if(obj.doorStatePos2 === 'Closing') {
      doorStatePos2Data.push(1);  
    }
    else if(obj.doorStatePos2 === 'Opened') {
      doorStatePos2Data.push(2);  
    }
    else if(obj.doorStatePos2 === 'Closed') {
      doorStatePos2Data.push(3);  
    }
    else if(obj.doorStatePos2 === 'Locked') {
      doorStatePos2Data.push(4);
    }
  }
  if (doorStatePos2Data.length > maxLen) {
        doorStatePos2Data.shift();
  }

  if(obj.drivePhase) {
    if(obj.drivePhase === 'Acceleration') {
      doorDrvPhsData.push(0);
    }
    else if(obj.drivePhase === 'FullSpeed') {
      doorDrvPhsData.push(1);
    }
    else if(obj.drivePhase === 'Standing') {
      doorDrvPhsData.push(2);
    }
    else if(obj.drivePhase === 'Braking') {
      doorDrvPhsData.push(3);
    }

  }
  if (doorDrvPhsData.length > maxLen) {
        doorDrvPhsData.shift();
  }
  

  myLineChart.update();
  myLineChart2.update();
  myLineChart3.update();
  myLineChart4.update();
  myLineChart5.update();
  myLineChart6.update();

  } catch (err) {
    console.error(err);
  }

  }

});
