
const STATE = {
  "SUCCESS": "sucess",
  "ERROR": "error",
  "IGNORED": "ignored",
}

const STATE_ICON_CLASS = {
  "SUCCESS": "fa-check-circle",
  "ERROR": "fa-times-circle",
  "IGNORED": "fa-question-circle",
}

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
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
  test.style.display = "none";
  test.style.display = "block";
}

setRunning = function setRunning(testName,value){
  var test = document.querySelector("#test-" + testName);
  if(value == true){
    test.classList.add('running');
  } else {
    test.classList.remove('running');
  }
  test.style.display = "none";
  test.style.display = "block";
}

setStale = function setStale(testName,value){
  var test = document.querySelector("#test-" + testName);
  if(value == true){
    test.classList.add('stale');
  } else {
    test.classList.remove('stale');
  }
  test.style.display = "none";
  test.style.display = "block";
}

runSimulation = function(){
    window.requestAnimationFrame( () => {
      setRunning("dep_graph_new",true);
    });
    wait(1000);
    window.requestAnimationFrame( () => {
      changeState("dep_graph_new","ERROR");
      setRunning("dep_graph_new",false);
      setRunning("affected_list",true);
    });
    wait(1000);
    window.requestAnimationFrame( () => {
      setRunning("affected_list",false);
      setRunning("two_modules_combination",true);
    });

}
