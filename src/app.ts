import { envs } from './config/plugins/env.plugin';
import { Server } from './presentation/server'
import 'dotenv/config'

(() => {

main();

})();

function main () {
  //Server.start();
  console.log(envs.MAILER_EMAIL)
  console.log(envs.PORT)
}