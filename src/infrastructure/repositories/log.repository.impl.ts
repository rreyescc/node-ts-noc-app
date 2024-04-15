import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(logEntity: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(logEntity);
  }

  async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
  
}