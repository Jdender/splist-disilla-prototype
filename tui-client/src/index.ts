import Vorpal = require('vorpal');

const vorpal = new Vorpal();

vorpal
    .command('ping', 'Outputs "Pong!".')
    .action(async () => {

        vorpal.activeCommand.log('Pong!');
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
