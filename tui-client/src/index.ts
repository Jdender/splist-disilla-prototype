import Vorpal = require('vorpal');
import { Client } from 'api-client';
import { inspect } from 'util';

const vorpal = new Vorpal();
const client = new Client('http://localhost:8080');

vorpal
    .command('ping', 'Outputs "Pong!".')
    .action(async () => {

        const result = await client.getHelloWorld()

        vorpal.activeCommand.log(inspect(result));
    });

vorpal
    .catch('[...message]', 'Send a message')
    .action(async ({message}) => {

    });

vorpal
    .command('cd <channel id>', 'Change channels')

vorpal
    .delimiter('splist$')
    .show();
