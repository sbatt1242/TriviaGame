// Global Variables
var obj;
var right = 0;
var wrong = 0;
var none = 0;
var question = 1;

// Trivia Object
var trivia = {
  Q1: {
    q: "Question 1: Which linebacker was drafted by the Chiefs with the number four pick in the 1989 NFL Draft?",
    a1: "Lamar Hunt",
    a2: "Brett Favre",
    a3: "Derrick Thomas",
    ca: "Derrick Thomas",
    img: "q1",
    used: false,
  },
  Q2: {
    q: "Question 2: Before they changed to the Kansas City Chiefs in 1963, what was the team called?",
    a1: "KC Killers",
    a2: "Dallas Texans",
    a3: "St. Louis Hogs",
    ca: "Dallas Texans",
    img: "q2",
    used: false,
  },
  Q3: {
    q: "Question 3: Who wore number 31 for Kansas City in 2003?",
    a1: "Priest Holmes",
    a2: "Jerry Rice",
    a3: "Junior Seau",
    a4: "Joe Montana",
    ca: "Priest Holmes",
    img: "q3",
    used: false,
  },
  
}

// Timer Object
var timer = {
  num: 20,
  counter: 0,
  run: function(){
    $("#timer").html("<h3> Time Remaining: " + timer.num + " seconds</h3>");
    timer.counter = setInterval(timer.decrement, 1000);
  },
  decrement: function(){ 
    timer.num--;
    $("#timer").html("<h3> Time Remaining: " + timer.num + " seconds</h3>");
    if(timer.num === 0){
      timer.stop();
      timer.reset();
      game.answer(obj);
    }
  },
  delay: function(time){
    $("#timer").show();
    setTimeout(timer.nextGame, time);
  },
  stop: function(){
    clearInterval(timer.counter);
  },
  reset: function(){
    timer.num = 20;
  },
  nextGame: function(){
    if(question <= 3){
      game.load();
    }
    else{
      game.loadResult();
    }
  },
}

// Game Object
var game = {
  load: function(){
    //start the timer
    timer.run();

    $("#restart").hide();
    $("#result").hide();
    $("#panel").show();
    $("#timer").show();
    // call function to select the question
    var obj = game.selectQuestion();

    // increment question for next
    question++;

    // load question
    $("#question").html("<h2>" + obj.q + "</h2>");
    // clear answers
    $("#answer").empty();
    // clear results
    $("#result").empty();
    // load answers   
    for(i in obj){
      if(i[0] === "a"){
        var divTag = $("<div>");
        divTag.addClass("btn btn-warning btn-lg");
        divTag.attr("data-answer", i);
        divTag.on({"click": function() {
          // stop/reset the timer
          timer.stop();
          timer.reset();
          var selected = $(this).data("answer");
          if(obj[selected] === obj.ca){
            console.log("Correct");   
            game.right(obj);   
          }
          else{
            console.log("Incorrect");
            game.wrong(obj);
          }
          }
        });
        divTag.text(obj[i]);
        $("#answer").append(divTag);
        $("#answer").append("<br/>");
      }
    }
  },
  selectQuestion: function(){
    for(i in trivia){
    console.log(trivia[i].used);  
      if(!trivia[i].used){
        obj = trivia[i];
        trivia[i].used = true;
        return obj;
      }
    }
  },
  right: function(obj){
    right++;
    $("#result").html("<h3 style='color: blue;'>You have selected the correct answer: " + obj.ca + "</h3><h4>Notes: " + obj.ex + "</h4>" + "<p><img src='images/" + obj.img + ".jpg'/></p><p>You will be redirected to next question in 10 seconds.</p>");
    $("#result").show();
    $("#panel").hide();
    timer.delay(10000);
  },
  wrong: function(obj){
    wrong++;
    $("#result").html("<h3 style='color: red;'>You have selected a wrong answer. Correct answer was: " + obj.ca + "</h3><h4>Notes: " + obj.ex + "</h4>" + "<p><img src='images/" + obj.img + ".jpg'/></p><p>You will be redirected to next question in 10 seconds.</p>");
    $("#result").show();
    $("#panel").hide();
    timer.delay(10000);
  },
  answer: function(obj){
    none++;
    $("#result").html("<h3 style='color: green;''>Time is up. Correct Answer was: " + obj.ca + "</h3><h4>Notes: " + obj.ex + "</h4>" + "<p><img src='images/" + obj.img + ".jpg'/></p><p>You will be redirected to next question in 10 seconds.</p>");
    $("#result").show();
    $("#panel").hide();
    timer.delay(10000);
  },
  loadResult: function(){
    var tempDiv = $("<div>");
    tempDiv.append("<h2>Results:</h2>");
    tempDiv.append("<h3># Correct: " + right + "</h3>");
    tempDiv.append("<h3># Incorrect: " + wrong + "</h3>");
    tempDiv.append("<h3># No answer: " + none + "</h3>");
    $("#restart").show();
    $("#result").html(tempDiv);
    $("#result").show();
    $("#panel").hide();
    $("#timer").hide();
  },
  // game reset function
  reset: function(){
    right = 0;
    wrong = 0;
    none = 0;
    question = 1;
    timer.reset();
    for(i in trivia){
      trivia[i].used = false;
    }
  },
}

$(document).ready(function(){
  $("#restart").hide();

  $("#start").on("click", function(){
    $("#start").hide();
    $("#chiefs").hide();
    game.load();
  });

  $("#restart").on("click", function(){
    game.reset();
    game.load();
  });
});


