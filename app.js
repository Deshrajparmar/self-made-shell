const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : "$"
});

rl.prompt();

function findExecutable(cmd){

    const pathEnv = process.env.PATH || "";

    const paths = pathEnv.split(path.delimiter);

    for(const dir of paths){

        const fullPath = path.join(dir, cmd);

        try{
            fs.accessSync(fullPath, fs.constants.X_OK);
            return fullPath;
        }catch(err){}
    }

    return null;
}



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

 if(input.startsWith("type ")){
  const cmd = input.slice(5);
  const executable = findExecutable(cmd);

  if(executable){
    console.log(executable);
  }else{
    console.log("Not found");
  }
  rl.prompt();
  return;
 }




})