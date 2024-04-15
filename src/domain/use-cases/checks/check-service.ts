import { LogEntity, SeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = ( error: string ) => void

export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback, 
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error(`url: ${url} status: Service error`)
      this.successCallback();
      return true; 
    } catch(error) {
      const log = new LogEntity(SeverityLevel.high, `${url} is not ok. ${error}`);
      this.logRepository.saveLog(log)
      this.errorCallback(`${error}`);
      return false;
    }
  }

}