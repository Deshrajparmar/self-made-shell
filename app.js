const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ "
});

function findExecutable(cmd) {
    const pathEnv = process.env.PATH || "";
    const paths = pathEnv.split(path.delimiter);

    const extensions = process.platform === "win32"
        ? (process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(";")
        : [""];

    for (const dir of paths) {
        for (const ext of extensions) {
            const fullPath = path.join(dir, cmd + ext);
            try {
                fs.accessSync(fullPath, fs.constants.X_OK);
                return fullPath;
            } catch (err) {}
        }
    }

    return null;
}

rl.prompt();

rl.on("line", (input) => {
    input = input.trim();

    if (input === "exit") {
        rl.close();
        return;
    }

    if (input.startsWith("echo ")) {
        console.log(input.slice(5));
    } else if (input.startsWith("type ")) {
        const cmd = input.slice(5);
        const executable = findExecutable(cmd);
        console.log(executable ? executable : `${cmd}: not found`);
    } else if (input.length > 0) {
        const [cmd, ...args] = input.split(" ");
        const executable = findExecutable(cmd);
        if (executable) {
            spawnSync(executable, args, { stdio: "inherit" });
        } else {
            console.log(`${cmd}: command not found`);
        }
    }

    rl.prompt();
});