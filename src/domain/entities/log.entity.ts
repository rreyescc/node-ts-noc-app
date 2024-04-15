export enum SeverityLevel {
  low = 'low',
  mediun = 'mediun',
  high = 'high'
}

export class LogEntity {

  public severityLevel: SeverityLevel;
  public message: string;
  public createAt: Date;


  constructor(severityLevel: SeverityLevel, message: string) {
    this.severityLevel = severityLevel;
    this.message = message;
    this.createAt = new Date();
  }

  static fromJson = (log: string) => {
      const { severityLevel, message, createAt } = JSON.parse(log);
      const logEntity = new LogEntity(severityLevel, message);
      logEntity.createAt = createAt;
      return logEntity;
  }



}