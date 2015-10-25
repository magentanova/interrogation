// JavaScript Document

function addLine(div,ul,text,ellipsis){
  li = document.createElement("LI"); 
  li.className = "chatLine";
  ul.appendChild(li);
  li.scrollIntoView();
  if(ul.offsetHeight >= div.offsetHeight && flag !== true){
      ul.style.height = div.offsetHeight + "px";
      flag = true;
     }
  if (ellipsis){
    li.innerHTML = "...";
    setTimeout(function(){setLiText(li,text)},750);
  }
  else{
    li.innerHTML = "DETECTIVE: " + text;
  }
}

function getHint(){
  if ($("#hintPrompt").css("display") != "none"){
    $("#hintPrompt").fadeToggle();
    $("#hintContent").fadeToggle();
  }
}

function initChat(){
  cookieDict = $.cookie();
  if (isEmpty(cookieDict)){
    $.cookie("artie-level","1");
    $.cookie("judd-level","1");
  }

  // $.ajax({
  //  url: "init.php",
  //  type: "post",
  //  success: function(){
  //   console.log('chat data initiated...')
  //  },
  //  error: function(jqXHR, textStatus, errorThrown){
  //     alert(errorThrown);
  //     setTimeout('updateChat()', 3000);
  // }
  // })
}

function isEmpty(ob){
   for(var i in ob){ return false;}
  return true;
}


function setLiText(li,text){
  li.innerHTML = text;
}

function setScroll(){
   var box = $(".prisonerResponse")[0]; //selector returns whole set. just get the first one.
   box.scrollTop = box.scrollHeight;
}

function updatePrompt(promptText){
  $("#hintContent").css("display","none");
  $("#hintPrompt").css("display","block");
  $("#hintPrompt").html('Click here for a new hint.');
  $('#hintContent').html(promptText);
}

function updateChat(obj){
   var divs = $(".prisonerResponse"),
      uls = $(".responseList"),
      inputs = $(".userInput");
      flag = false;
      prisoner = obj.id;

  // identify the correct prisoner box
   if (obj.id == "artie"){
      i = 0;
   }
   else if (obj.id == "judd"){
      i = 1;
   }
   
   var div = divs[i],
      ul = uls[i],
      input = inputs[i],
      li;

   obj.onkeypress = function(e){
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        // read the openness level from the html data
         // var level = div.getAttribute('data-level');
         var key = prisoner + '-level';
         var level = $.cookie(key);
         console.log($.cookie());
         console.log(level);
         // read the input text
         inputText = input.value;
         // do ajax
         $.ajax({
           url: "prisonerResponse",
           type: "post",
           contentType:"application/json",
           dataType:"json",
           data: JSON.stringify({'prisoner':prisoner,'q':inputText,'level':level}),
           success: function(response){
              console.log(response);
              // var promptText = $(xml).find('prompt').text();
              // if (promptText){
              //   updatePrompt(promptText,inputText);
              // }

              // // add the player's own comment to the narrative stream
              // addLine(div,ul,inputText,false);
              // // // add the response to the narrative stream
              // setTimeout(function(){addLine(div,ul,responseText,true)},750);
              // // // if we've advanced a level, darken the red border
              // var newLevel = $(xml).find('level').text();
              // if (parseInt(newLevel,10) > parseInt(level,10)){
              //   console.log(newLevel + ' ' + level);
              //   border = $(div).css("border-color");
              //   match = border.match(/(\d\.*\d*)\)/);
              //   opacity = parseFloat(match[1]);
              //   console.log(opacity);
              //   opacity += .1;
              //   console.log(opacity);
              //   $(div).css("border-color","rgba(255, 0, 0, " + opacity + ")");
              //   console.log('css changed');
              //   $(div).attr("data-level",newLevel);
              // }

           },
           error: function(jqXHR, textStatus, errorThrown){
              alert(errorThrown);
              setTimeout('updateChat()', 3000);
           }
         })
      // return ($(xml).find('response').text());
      input.value = "";
      }     
   }
} 
