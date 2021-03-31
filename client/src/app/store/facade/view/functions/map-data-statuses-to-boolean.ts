import {DataStatus} from "../../../enums/data-status";

export function mapDataStatusesToBoolean(status: DataStatus, statuses: DataStatus[]): boolean {
  return statuses.includes(status);
}
