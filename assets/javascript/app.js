
var intervalId;


var Quiz = {
      Questions: [
            {
            Qnumber: 1,
            Qdescription: "'. JPG ' extension refers usually to what kind of file?",
            Qchoices: ["System file", "Animation/movie file", "MS Encarta document", "Image file"],
            Qanswer: "Image file"
            },
          {
            Qnumber: 2,
            Qdescription: "http://www.indiabix.com - is an example of what?",
            Qchoices: ["URL", "Access code", "Directory", "Server"],
            Qanswer: "URL"
          },
          {
            Qnumber: 3,
            Qdescription: "Which of these is a valid e-mail address?",
            Qchoices: ["professor.at.learnthenet", "www.learnthenet.com", "professor@learnthenet.com", "professor@learnthenet"],
            Qanswer: "professor@learnthenet.com"
          },
          {
            Qnumber: 4,
            Qdescription: "'DB' computer abbreviation usually means ?",
            Qchoices: ["Database", "Double Byte", "Data Block", "Driver Boot"],
            Qanswer: "Database"
          },
          {
            Qnumber: 5,
            Qdescription: "What do you call a computer on a network that requests files from another computer?",
            Qchoices: ["client", "A host", "A router", "A web server"],
            Qanswer: "client"
          }
       ],
       questionNumber:0,
       timeAllotted:10,
       numberOfCorrectAnswer: 0,
       numberOfIncorrectAnswer: 0,
       numberOfUnAnswered: 0,
       
          //-----------------------------------object methods
       displayQuestion:function(qnum) { 
                  clearDiv();
                  $("#question").html(Quiz.Questions[qnum].Qnumber + " )<B> " + Quiz.Questions[qnum].Qdescription + "<br>")
                  for(var i=0;i< Quiz.Questions[qnum].Qchoices.length;i++){                     
                  var ctrl = $('<input/>').attr({ type: 'radio', name:'rad' ,value:Quiz.Questions[qnum].Qchoices[i]}).addClass("rad");
                  $("#choice"+i).append(ctrl).append(Quiz.Questions[qnum].Qchoices[i]);                                            
                   }                                                   
                  },
                  
       getNextQuestion:function(){ 
                    $("#questioncontainer").show()
                    $(".notify").hide();
                    if (Quiz.Questions.length  > Quiz.questionNumber) {                   
                      showTime();
                      
                      Quiz.displayQuestion(Quiz.questionNumber);
                      startTimer();  
                            
                    }
                    else {
                      Quiz.notifyStatus("result");                
                    }
                    },

        notifyStatus:function(status){

                      switch(status){

                             case "correct":

                        Quiz.numberOfCorrectAnswer++;                 
                        $("#questioncontainer").hide();
                        $(".notify").show();
                      
                        $("#feedBack").html("<h4>you Got it right !!<h4>");
                        setTimeout(stop, 2000);
                            break;

                              case "wrong":

                        Quiz.numberOfIncorrectAnswer++;                 
                        $("#questioncontainer").hide();
                        $(".notify").show();
                       
                        $("#feedBack").html("<h4>Opps that was wrong Answer</h4><br><h6>The answer was"+" "+Quiz.Questions[Quiz.questionNumber].Qanswer+"</h6>");
                        setTimeout(stop, 3000);
                            break;

                               case "run out of time":

                        Quiz.numberOfUnAnswered++;
                
                        $("#questioncontainer").hide();
                        $(".notify").show();
                        
                        $("#feedBack").html("<h5>YOU RUN OUT OF TIME</h5><br><h6>The correct answer was"+" "+Quiz.Questions[Quiz.questionNumber].Qanswer+"</h6>");
                          pauseTimer();
                          setTimeout(stop, 3000) //stop();
                            break;

                               case "result":
                           
                        $("#timer").html("");
                        $("#questioncontainer").hide();
                        $(".notify").show();
                        $("#feedBack").html("<h5>End of questions</h5><br>Number of correct answer :"+" "+Quiz.numberOfCorrectAnswer +"<br>Number of Incorect Answers :"+" "+Quiz.numberOfIncorrectAnswer+"<br>Number of UnAnswered :"+" "+Quiz.numberOfUnAnswered+"<br>");                         
                       
                        $(".notify").slideUp(2000).slideDown(2000);
                                                  
                        var ctrl = $('<button/>').attr({ type: 'button',value:"Retake Quiz"});
                        ctrl.text("Retake Quiz");
                        ctrl.addClass("retake mt-5")
                        $("#feedBack").append(ctrl);   


                         $(document).on("click", ".retake", function () { // restarts the quiz
                            
                           Quiz.reSetQuiz();
                           $("#headercont").hide();
                           $("#questioncontainer").show(); 
                           startQuiz();
                            
                        
                        });       
                       break;

                        }
                    },
          reSetQuiz:function(){//reset the quiz if the user wants to retake it
            Quiz.questionNumber=0;
            Quiz.timeAllotted=10;
            Quiz.numberOfCorrectAnswer= 0;
            Quiz.numberOfIncorrectAnswer= 0;
            Quiz.numberOfUnAnswered= 0;


          }
   }//end of object property and methods

                    //******************************************* */
                    $(document).ready(function () {
                        $("#questioncontainer").hide(); 
                        $(".notify").hide();
                    
                  });
//-----------------------------when the user click start Quze button-------------------------------------------------------------
                    $("#startQuestion").on("click", function () {
                        $("#headercont").hide();
                        $("#questioncontainer").show(); 
                        startQuiz();
                     });
//----------------------------------------------------------------------------------------------
               function startQuiz() {
              
                     showTime();                   
                     $(".notify").hide();
                     Quiz.displayQuestion(Quiz.questionNumber);
                     startTimer();  
                              
                   }
 //-----------------------------when the user click the submit answer button-----------------------------------------------------------------
           
             
                 $("#isSelect").on("click", function(){

                    if( $("input:radio[name=rad]").is(":checked")){//check one of the radio button is checked
                       var answer= $('input:radio[name=rad]:checked').val();            
                       pauseTimer();

                       if(answer===Quiz.Questions[Quiz.questionNumber].Qanswer){
                         Quiz.notifyStatus("correct");                     
                         }    
                       else{
                        Quiz.notifyStatus("wrong");
                        
                          } 
                      }
                        
                        })
                                 
//-----------------------------------TIME FUNCTIONS--------------------------------------------------------------
                   function startTimer() {
                          clearInterval(intervalId);
                           intervalId = setInterval(decrement, 1000);
                            }

                   function decrement() {
                            //  Decrease timeAlloted by one.

                         Quiz.timeAllotted--;
                                //  Show the number in the #timer tag.
                              
                         showTime();
                                //  Once timeAlloted hits zero...
                          if (Quiz.timeAllotted === 0) {
                          Quiz.notifyStatus("run out of time");
                                
                                }
                        }

                     function stop() {

                          clearInterval(intervalId);
                          resetTime();
                          Quiz.questionNumber++;
                          Quiz.getNextQuestion();
                          }

                     function resetTime() {
                                 Quiz.timeAllotted = 10;
                                }

                     function pauseTimer(){
                                  clearInterval(intervalId);
                                }
                     function showTime(){
                                    $("#timer").html("<h1>"+ Quiz.timeAllotted +"</h1>");

                                }                        
//--------------------------------------------------------------------------------------------------
                    function clearDiv(){
                              $(".choices").html("");

                            }

                         


                            


