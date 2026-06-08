import * as ms from "ms";

export function seconds(msValue: ms.StringValue): number {
  return ms(msValue) / 1000;
}
