const fs = require('fs-extra')
const { on, argv } = require('node:process');
const path = require('path');
const { exec } = require('node:child_process');
const prompt = require('prompt-sync')({ sigint: true });

const COUNTER_PATH = path.join(__dirname, 'counter');

const count_sync = () => {
    console.log(`\x1B[32mExecuting "count_sync()"...\x1B[0m`);
    const c = parseInt(fs.readFileSync(COUNTER_PATH)) + 1;
    fs.writeFileSync(COUNTER_PATH, c.toString());
    console.log('\x1B[33mFinished executing "count_sync()"\x1B[0m');

    return c;
};

const count_async = () => {
    console.log(`\x1B[32mExecuting "count_async()"...\x1B[0m`);

    return new Promise((resolve, reject) => {
        fs.readFile(COUNTER_PATH, (err, data) => {
            if (err) throw err;
    
            const c = parseInt(data) + 1;
            fs.writeFile(COUNTER_PATH, c.toString(), err => {
                if (err) throw err;
                
                console.log(`\x1B[32mFinished executing "count_async()"\x1B[0m`);
                resolve(c);
            });
        });
    });
    
};

const exec_commands = commands_list => {
    let outputs = [];

    commands_list.forEach(command => {
        exec(command, (err, output) => {
            if (err) throw err;
            outputs.push(output);
        });
    })

    return new Promise((resolve, reject) => {
        const id = setInterval(() => {
            if (outputs.length === commands_list.length) {
                clearInterval(id);
                resolve(outputs);
            }
        }, 200);
    });
};

module.exports = {
    countSync: count_sync,
    countAsync: count_async,
    exec: exec_commands
};