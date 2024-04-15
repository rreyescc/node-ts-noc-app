import { LogEntity, SeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {

  abstract saveLog( logEntity: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: SeverityLevel ): Promise<LogEntity[]>;

}