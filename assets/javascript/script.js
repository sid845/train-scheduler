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


  $("#trainAdd").on("click",function(event) {
    event.preventDefault();
    
    var trainName=$("#name").val().trim();
    var trainDestination=$("#destination").val().trim();
    var trainTime=$("#time").val().trim();
    var trainFrequency=$("#frequency").val().trim();
    
    var newTrain={
      name:trainName,
      destination:trainDestination,
      time:trainTime,
      frequency:trainFrequency
    };
    
    database.ref().push(newTrain);
    
    alert("train successfully added");
    
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    
    trainName.val("");
    trainDestination.val("");
    trainTime.val("");
    trainFrequency.val("");
  });
  database.ref().on("child_added",function(snapshot,prevChildKey){
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  });
  
  