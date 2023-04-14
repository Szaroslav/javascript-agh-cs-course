const fs = require('fs-extra')
const { on, argv } = require('node:process');
const path = require('path');
const { exec } = require('node:child_process');
const prompt = require('prompt-sync')({ sigint: true });

const COUNTER_PATH = path.join(__dirname, 'counter');

const read_sync = () => {
    console.log(`\x1B[32mExecuting "read_sync()"...\x1B[0m`);
    const c = parseInt(fs.readFileSync(COUNTER_PATH)) + 1;
    fs.writeFileSync(COUNTER_PATH, c.toString());
    console.log('\x1B[33mFinished executing "read_sync()"\x1B[0m');
};

const read_async = () => {
    console.log(`\x1B[32mExecuting "read_async()"...\x1B[0m`);
    fs.readFile(COUNTER_PATH, (err, data) => {
        if (err) throw err;

        const c = parseInt(data) + 1;
        fs.writeFile(COUNTER_PATH, c.toString(), err => {
            if (err) throw err;

            console.log(`\x1B[32mFinished executing "read_async()"\x1B[0m`);
        });
        
    });
};

const exec_command = () => {
    const command = prompt();
    exec(command, (err, output) => {
        if (err) throw err;
        console.log(output);
        exec_command();
    });
};

if (argv.length > 2) {
    if (argv[2] === '--sync') {
        read_sync();
    }
    else if (argv[2] === '--async') {
        read_async();
    }
}
else {
    console.log(`\x1B[32mCommand runner\x1B[0m`);
    exec_command();
}