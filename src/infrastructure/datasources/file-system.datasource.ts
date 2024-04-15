import fs from 'fs'
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDatasource {

  private readonly logPath = 'logs';
  private readonly severityLevelList = ['low', 'mediun', 'high']
  //private readonly lowlLogsPath = 'logs/logs-low.log'
  //private readonly mediumLogsPath = 'logs/logs-medium.log'
  //private readonly highLogsPath = 'logs/logs-high.log'

  constructor() {
    this.createLogPath();
  }

  private createLogPath() {
    if(!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    this.severityLevelList.forEach( severityLevel => {
      const logPath = `${this.logPath}/logs-${severityLevel}.log`;
      if(!fs.existsSync(logPath)) fs.writeFileSync(logPath, '');
    })
  }

  async saveLog(log: LogEntity): Promise<void> {
    const { severityLevel } = log;
    const logPath = `${this.logPath}/logs-${severityLevel}.log`;
    fs.appendFileSync(logPath, `${JSON.stringify(log)}\n` )
  }

  async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    const logPath = `${this.logPath}/logs-${severityLevel}.log`;
    const content = fs.readFileSync(logPath, { encoding: 'utf-8' });
    const logs = content.split("\n").map(LogEntity.fromJson);
    return logs;
  }

}