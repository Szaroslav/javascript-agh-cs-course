/**
     * Synchronously increments integer stored in external file.
     * @author Jakub Szaredko
*/
const count_sync = () => {};

/**
     * Asynchronously increments integer stored in external file.
     * @author Jakub Szaredko
*/
const count_async = () => {};

const exec_commands = commands_list => {};

const counter = {
     countSync: count_sync,
     countAsync: count_async,
     exec: exec_commands
};

export default counter;