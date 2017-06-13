$(document).ready(function(){
var config = {
    apiKey: "AIzaSyCKTFZhMVwjoZkZIBrNPTV-x4YWtvPfrO8",
    authDomain: "train-67d50.firebaseapp.com",
    databaseURL: "https://train-67d50.firebaseio.com",
    projectId: "train-67d50",
    storageBucket: "train-67d50.appspot.com",
    messagingSenderId: "811438782350"
  };
  firebase.initializeApp(config);
  
  database=firebase.database();

  var trainName="";
  var trainDestination="";
  var trainTime="";
  var trainFrequency=0;
  $("#trainAdd").on("click",function(event) {
    event.preventDefault();
    
    trainName=$("#name").val().trim();
    trainDestination=$("#destination").val().trim();
    trainTime=$("#time").val().trim();
    trainFrequency=$("#frequency").val().trim();
    
    var newTrain={
      name:trainName,
      destination:trainDestination,
      trainTime:trainTime,
      frequency:trainFrequency
    };
    
    database.ref().push(newTrain);
    
    alert("train successfully added");
    
    trainName.val("");
    trainDestination.val("");
    trainTime.val("");
    trainFrequency.val("");
    alert("hh");
  });
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().frequency;
    trainTime = moment().format("hh:mm");
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var tMinutesTillTrain = trainFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextArrival=moment(nextTrain).format("hh:mm")
    $('#table > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td>");
    
  });
  
});