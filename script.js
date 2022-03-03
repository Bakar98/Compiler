

var language = document.getElementById("language");
var languageId = '0';
var codeId = "";
var textarea = document.getElementById("textarea");
var lineCounter = document.getElementById("lineCounter");
var outputDiv = document.getElementById("outputDiv");

var compileBttn = document.querySelector("button");
//console.log(language);

function changeLanguage(event) {
  event.preventDefault();
  outputDiv.innerHTML = "";
  textarea.value = "";
  languageId = event.target.value;
  console.log(languageId);
}


compileBttn.addEventListener("click", function(){
  
  var syntax = textarea.value;

  if(syntax!==""){  
    
  outputDiv.innerHTML = "";
  

  //console.log(`languge id: ${languageId}, syntax: ${syntax}`);
  var codeRequest = new XMLHttpRequest;
  codeRequest.open("POST", "https://codequotient.com/api/executeCode");
  codeRequest.setRequestHeader("Content-Type","application/json");
  codeRequest.send(JSON.stringify({"code" :  syntax, "langId" : languageId}))
  
  codeRequest.addEventListener("load", function(event){
    codeId = JSON.parse(event.target.responseText).codeId;
  })

  setTimeout(resultReq, 3000);
  outputDiv.innerHTML = "compiling...";
  }
  else
    outputDiv.innerHTML = "";

})

function resultReq(){
  var resultRequest = new XMLHttpRequest;
  
  resultRequest.open("GET", "https://codequotient.com/api/codeResult/"+codeId);
  resultRequest.send();
  resultRequest.addEventListener("load", function(event){
    // console.log(codeId +"in result");
    // console.log(JSON.parse(JSON.parse(event.target.responseText).data));
    var output = (JSON.parse(JSON.parse(event.target.responseText).data)).output;
    var errors = (JSON.parse(JSON.parse(event.target.responseText).data)).errors;
    printResult(output, errors);
  })
}

function printResult(output, errors){
  if(output!="")
    outputDiv.innerHTML = output;
  else
    outputDiv.innerHTML = "Error: "+errors;
    console.log(output)
}



language.addEventListener("change", changeLanguage);

















var changeTheme = document.getElementById("themeBtn");

var flag = true;


changeTheme.addEventListener("click", function(){
 
 
  if(flag){
  document.body.style.backgroundColor = "rgb(21,32,43)";
  document.getElementById("theme").style.color = "white";
  document.querySelector("h1").style.color = "whitesmoke";
  document.querySelector("h2").style.color = "whitesmoke";
  flag = false;
  }

  
  else{
    document.body.style.backgroundColor = "whitesmoke";
    document.querySelector("h1").style.color = "black";
  document.querySelector("h2").style.color = "black";
    document.getElementById("theme").style.color = "rgb(21,32,43)";
    flag = true;
  }
})




















 textarea.addEventListener('scroll', () => {
    lineCounter.scrollTop = textarea.scrollTop;
    lineCounter.scrollLeft = textarea.scrollLeft;
});














var lineCountCache = 0;
function line_counter() {
      var lineCount = textarea.value.split('\n').length;
      var outarr = new Array();
      if (lineCountCache != lineCount) {
         for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + '.';
         }
         lineCounter.value = outarr.join('\n');
      }
      lineCountCache = lineCount;
}

textarea.addEventListener('input', () => {
    line_counter();
});
