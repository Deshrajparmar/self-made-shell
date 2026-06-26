const readline = require("readline");

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : "$"
});

rl.prompt();

rl.on("line",(input) =>{
  input = input.trim();
  
  if(input == "exit"){
    rl.close();
    return;
  }
  console.log(input);

  rl.prompt();
 if(input.startsWith("echo")){
    console.log(input.slice(5));
    rl.prompt();
    return;
 }   




})