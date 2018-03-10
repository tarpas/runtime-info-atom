
const STATE = {
  "PASSED": "passed",
  "FAILED": "failed",
  "SKIPPED": "skipped",
}

const STATE_ICON_CLASS = {
  "PASSED": "fa-check-circle",
  "FAILED": "fa-times-circle",
  "SKIPPED": "fa-minus-circle",
}

changeState = function changeState(testName,stateName){
  var image = document.querySelector("#test-" + testName + " i");
  image.className = "fa " + STATE_ICON_CLASS[stateName];
  var test = document.querySelector("#test-" + testName);
  var className = "test " + STATE[stateName];
  if (test.classList.contains('running')) {
    className += " running";
  }
  if (test.classList.contains('stale')) {
    className += " stale";
  }
  test.className = className;
}

setRunning = function setRunning(testName,value){
  var test = document.querySelector("#test-" + testName);
  if(value == true){
    test.classList.add('running');
  } else {
    test.classList.remove('running');
  }
}

setStale = function setStale(testName,value){
  var test = document.querySelector("#test-" + testName);
  if(value == true){
    test.classList.add('stale');
  } else {
    test.classList.remove('stale');
  }
}

function animate(steps,interval){
  var current_step = 0;
  var step_count = steps.length;
  function draw(){
    if(current_step === step_count){
      return;
    }
    setTimeout(() => {
        requestAnimationFrame(draw);
        steps[current_step]();
        current_step++;
    }, interval);
  }
  draw();
}


runSimulation = function(){
  var steps = [
    () => {
      setRunning("affected_list",true);
    },
    () => {
      setRunning("affected_list",false);
      changeState("affected_list","FAILED");
      setRunning("affected_list2",true);
    },
    () => {
      setRunning("affected_list2",false);
      setRunning("classes_depggraph",true);
    },
    () => {
      setRunning("classes_depggraph",false);
      changeState("classes_depggraph","PASSED");
      setStale("classes_depggraph",false);
      changeState("dep_graph1","SKIPPED");
      changeState("dep_graph2","SKIPPED");
      setRunning("dep_graph3",true);
    },
    () => {
      setRunning("dep_graph3",false);
      setRunning("dep_graph4",true);
      setStale("sqlite_assumption",true);
      setStale("write_data",true);
      setStale("write_read_data",true);
      setStale("write_read_data2",true);
    },
    () => {
      changeState("dep_graph4","FAILED");
      setRunning("dep_graph4",false);
      setRunning("dep_graph_new",true);
    },
  ];
  //initial state
  setStale("classes_depggraph",true);
  changeState("classes_depggraph","FAILED");
  animate(steps,1000);
}
