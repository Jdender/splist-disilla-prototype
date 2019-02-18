import Vorpal = require('vorpal');
import { Client } from 'api-client';
import { inspect } from 'util';

const vorpal = new Vorpal();
const client = new Client('http://localhost:8080');

vorpal
    .command('history  <skip> <take>', 'Page though message history.')
    .action(async ({ skip, take }) => {

        const messages = await client.getHistory(skip, take);

        messages.map(msg =>
            vorpal.activeCommand.log(`[${msg.id}]<guest> ${msg.content}`),
        );
    });

vorpal
    .catch('[message...]', 'Send a message')
    .action(async ({ message }) => {
        
        client.sendMessage(message.join(' '));
    });

vorpal
    .delimiter('splist$')
    .show();
