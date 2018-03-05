const Discord = require("discord.js");
const bot = new Discord.Client();
const JsonDB = require("node-json-db");
const db = new JsonDB("Computer", true, true);
const txt = new JsonDB("txt", true, true);

curdir = "/Local_Computer";
datapath = "Local_Computer";

cmdon = false;
cmd = ["\n ", "\n ", "\n ", "\n ", "\n ","\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n", "Local_Computer"];
cmdst = ["\n ", "\n ", "\n ", "\n ", "\n ","\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n", "Local_Computer"];


bot.login("NDE4ODYxNTc0NzA3NjA5NjEw.DXnvVA.W2x-UNv6YtzwW_NWLjUvCaRHpZ4");

bot.on('ready', message => {
    console.log("Ready!");
    bot.user.setActivity('With your files :3');
})

bot.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(".")) return;
    
    pc = db.getData("/");
    path = db.getData(curdir);
    
    if (message.content === "cmd" && cmdon === false) {
        message.channel.send("```"+cmd.join("")+">_```").then(msg => {
            mid = msg.id;
        })
        message.delete(100)
        user = message.author.id;
        cmdon = true
        return;
        };
    if (cmdon === true && user === message.author.id) {
        var command = message.content
        message.delete(100);
        if (command === "stop" || command === "quit" || command === "terminate" || command === "close" || command === "exit" || command === "leave" || command === "destroy" || command === "remove") {
            cmd = cmdst;
            try {
                message.channel.fetchMessage(mid).then(msg => {
                    msg.delete(100);
                })
            } catch(error) {message.channel.send("No terminal was active")};
            cmdon = false;
            curdir = "/Local_Computer";
            datapath = "Local_Computer";      
            cmd = ["\n ", "\n ", "\n ", "\n ", "\n ","\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n ", "\n", "Local_Computer"];                  
        } else {
            if (command === "help") {
                cd = cmd.pop();
                cmd.push(cd+">"+command+"\n");
                cmd.push("Need more help on a specific command? Type help <command name>\n");
                cmd.push("cd      Goes to the chosen directory\n");
                cmd.push("ls      Shows all the directories you can go to\n");
                cmd.push("touch   Creates a new file in the current directory, is always .txt\n");
                cmd.push("cat     Reads the chosen text file\n");
                cmd.push("edit    Puts data inside a text file\n");
                cmd.push("mkdir   Creates a new root in the file system\n");
                cmd.push("rm      Deletes the chosen file if in current directory\n \n");
                cmd.push(cd+"");
            } else if (command.startsWith("help ")) {
                naam = command.slice(5);
                if (naam === "cd") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'cd' you can change your directory");
                    cmd.push("\n");
                    cmd.push("Example: cd Program Files\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                };
                if (naam === "touch") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'touch' you can make a new file in the current directory");
                    cmd.push("\n");
                    cmd.push("Example: touch newFile\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                };
                if (naam === "cat") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'cat' you can read a .txt file in the current directory");
                    cmd.push("\n");
                    cmd.push("Example: cat Example.txt\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                }
                if (naam === "ls") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'ls' you can show all files and directories in current directory");
                    cmd.push("\n");
                    cmd.push("Example: ls\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                } 
                if (naam === "edit") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'edit' you can put data inside a file");
                    cmd.push("\n");
                    cmd.push("Example: edit Example.txt information/ edit <.txt file> <data>\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                };
                if (naam === "mkdir") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'mkdir' you can create a new directory in the current directory");
                    cmd.push("\n");
                    cmd.push("Example: mkdir HomeDir\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                }  
                if (naam === "rm") {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("With 'rm' you can delete a file in the current directory");
                    cmd.push("\n");
                    cmd.push("Example: rm Example.txt\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                } 
            } else if (command.startsWith("cd ")) {
                dir = command.slice(3);
                if (!dir.includes(".txt")) {
                    if (dir === ".." && datapath !== "Local_Computer") {
                        console.log("datapath: "+datapath);
                        console.log("curdir: "+curdir);
                        if (datapath.replace(curdir, "") === "Local_Computer") {
                            cd = cmd.pop();
                            cmd.push(datapath+">"+command+"\n");
                            datapath = "Local_Computer";
                            cd = datapath;
                            cmd.push(" \n");
                            cmd.push(cd);
                            curdir = "/Local_Computer";
                        } else {
                        cd = cmd.pop();
                        cmd.push(datapath+">"+command+"\n");
                        datapath = datapath.replace(curdir, "");
                        curdir = datapath.slice(datapath.lastIndexOf("/"));
                        cd = datapath
                        cmd.push(" \n");
                        cmd.push(cd);
                        };

                    } else if (dir === ".") {
                        cd = cmd.pop();
                        cmd.push(datapath+">"+command+"\n");
                        curdir = "/Local_Computer";
                        datapath = "Local_Computer";
                        cd = datapath;
                        cmd.push(" \n");
                        cmd.push(cd);

                    } else if (dir === ".." && datapath === "Local_Computer") {
                        cd = cmd.pop();
                        cmd.push(datapath+">"+command+"\n");
                        cmd.push("You are already at the root of the system.\n");
                        cmd.push(" \n");
                        cmd.push(cd);
                    } else {
                        if (path.includes(dir)) {
                            cmd[cmd.length - 1] = cmd[cmd.length - 1] + "/" + dir
                            cd = cmd.pop();
                            cmd.push(datapath+">"+command+"\n");
                            cmd.push(" \n");
                            cmd.push(cd);
                            curdir = "/" + dir;
                            datapath = datapath + "/" + dir;
                        } else {
                            cd = cmd.pop();
                            cmd.push(cd+">"+command+"\n");
                            cmd.push("Can't find the chosen directory '"+dir+"'\n");
                            cmd.push(" \n");
                            cmd.push(cd);
                        };
                    };
                } else {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("Can't find the chosen directory '"+dir+"'\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                }
            } else if (command.startsWith("touch ")) {
                filename = command.slice(6)+".txt";
                try {
                    var test = txt.getData("/"+filename);
                    cd = cmd.pop();
                    cmd.push(datapath+">"+command+"\n");
                    cmd.push("The chosen file already exists\n");
                    cmd.push(" \n")
                    cmd.push(cd);
                } catch(err) { 
                    txt.push("/"+filename, {data: ""}, false);
                    db.push(curdir+"[]", filename, false);
                    cd = cmd.pop();
                    cmd.push(datapath+">"+command+"\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                };
            } else if (command.startsWith("cat ")) {
                filename = command.slice(4);
                if (path.includes(filename)) {
                    try {
                        text = txt.getData("/"+filename);
                    } catch(err) {
                        console.log(err);
                    }
                    cd = cmd.pop();
                    cmd.push(datapath+">"+command+"\n");
                    cmd.push(text.data+"\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                } else {
                    cd = cmd.pop();
                    cmd.push(datapath+">"+command+"\n");
                    cmd.push("The chosen file does not exist in the current directory\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                }
            } else if (command.startsWith("edit ")) {
                filename = command.slice(5, command.indexOf(".txt") + 4);
                inhoud = message.content.slice(filename.length + 6);
                if (path.includes(filename)) {
                    txt.push("/"+filename, {data: inhoud});
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                } else {
                    cd = cmd.pop();
                    cmd.push(cd+">"+command+"\n");
                    cmd.push("'"+filename+"'The chosen text file can not be found\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                }
            } else if (command.startsWith("mkdir ")) {
                chosen = command.slice(6);
                db.push(curdir+"[]", chosen, false);
                db.push("/"+chosen, [], false);
                cd = cmd.pop();
                cmd.push(datapath+">"+command+"\n");
                cmd.push(" \n");
                cmd.push(cd);
            } else if (command.startsWith("rm ")) {
                filename = command.slice(3);
                if (path.includes(filename)) {
                    txt.delete("/"+filename);
                    del = db.getData(curdir);
                    arr = del.indexOf(filename);
                    del.splice(arr, 1);
                    db.push(curdir, del);
                    cd = cmd.pop();
                    cmd.push(datapath+">"+command+"\n");
                    cmd.push(" \n");
                    cmd.push(cd);
                }

            } else if (command === "ls") {
                cd = cmd.pop();
                cmd.push(cd+">"+command+"\n");
                cmd.push(path.join("\n"))
                cmd.push(" \n");
                cmd.push(" \n");
                cmd.push(cd);
            } else {
                cd = cmd.pop();
                cmd.push(cd+">"+command);
                cmd.push("\n'"+command+"' is not recognised as an internal or external command\n");
                cmd.push("operable program or batch file.");
                cmd.push("\n ");
                cmd.push("\n")
                cmd.push(cd);
                };

                for (i = 0; i < 15; i++) {
                if (cmd.length > 15) {
                    cmd.shift();
                };
            };
            message.channel.fetchMessage(mid).then(msg => {
                msg.edit("```"+cmd.join("")+">_```");
            })
        };
    };
})