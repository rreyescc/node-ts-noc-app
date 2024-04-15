import { CronService } from './cron/cron-service'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';


const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {

  constructor() {}

  public static start() {

    CronService.createJob('*/2 * * * * *', async () => {
      //const url = "http://www.google.com/";
      const url = "http://localhost:3000/posts";
      const isOk = await new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`), 
        (error) => console.log(`${url} has error, ${error}`)
      ).execute(url);
    });

  }
  
} 