const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

const ytdl = require("ytdl-core");


const token = 'NzM3NTc1NjM5MTEyMjIwNzIy.Xx_W1w.yoyw-GVjYhhIt_WH5AujfX42Bz8';


const PERFIX = '$';

var servers = {};


bot.on("ready", async () => {
    console.log('the bot is online!');
    bot.user.setActivity("Perfix is '$' " , {type: "WATCHING"});
});

bot.on('message', message=>{
    
    let args = message.content.substring(PERFIX.length).split(" ");

    switch (args[0]){


        case 'help':
            message.channel.send('use this commends : $ping ,$Erfun,$clear')
            break;



        case 'ping':
            message.reply(' 5 (Krappa)')
            break;

        case 'Erfun':
            message.channel.send('https://7b1de02a7bcf9c1df487-6849f9022b05f72b83236695aa4e9a0a.ssl.cf2.rackcdn.com/uploads/articles/2020/910320/baboon2_p3.jpg')
            break;

        case 'clear':
             if(!args[1]) return message.reply('Error please define second arg')
                 message.channel.bulkDelete(args[1]);
                break;

        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0],{filter: "audioonly"}));
                
                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else{
                        connection.disconnect();
                    }
                });

            }    

            if(!args[1]){
                message.channel.send("you need to provide a link");
                return;

            }
            if(!message.member.voice.channel){
                message.channel.send("you need to join voice channel first");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id];

            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            })


            break;
        



    
           
    
    }    
     
           
            
       
        
    

        
});

client.login(proccess.env.token);
