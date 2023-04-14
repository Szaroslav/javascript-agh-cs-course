const fs = require('fs-extra')
const { on, argv } = require('node:process');
const path = require('path');
const { exec } = require('node:child_process');
const prompt = require('prompt-sync')({ sigint: true });

const COUNTER_PATH = path.join(__dirname, 'counter');

const count_sync = () => {
    console.log(`\x1B[32mExecuting "count_sync()"...\x1B[0m`);
    const c = parseInt(fs.readFileSync(COUNTER_PATH)) + 1;
    console.log(c);
    fs.writeFileSync(COUNTER_PATH, c.toString());
    console.log('\x1B[33mFinished executing "count_sync()"\x1B[0m');
};

const count_async = () => {
    console.log(`\x1B[32mExecuting "count_async()"...\x1B[0m`);
    fs.readFile(COUNTER_PATH, (err, data) => {
        if (err) throw err;

        const c = parseInt(data) + 1;
        fs.writeFile(COUNTER_PATH, c.toString(), err => {
            if (err) throw err;
            
            console.log(c);
            console.log(`\x1B[32mFinished executing "count_async()"\x1B[0m`);
        });
        
    });
};

const exec_command = () => {
    const command = prompt();

    if (!command) {
        return;
    }

    exec(command, (err, output) => {
        if (err) throw err;
        console.log(output);
        exec_command();
    });
};

if (argv.length > 2) {
    if (argv[2] === '--sync') {
        count_sync();
    }
    else if (argv[2] === '--async') {
        count_async();
    }
}
else {
    console.log(`\x1B[32mCommand runner\x1B[0m`);
    exec_command();
}