import { v0 } from "BlueFoxJs/Automation/v0.js";
import { v1 } from "BlueFoxJs/Automation/v1.js";

export class BlueFox {
  async do(J) {
    return await {
      0: async () => {
        let _ = new v0();
        return await _.do(J);
      },
      1: async () => {
        let _ = new v1();
        return await _.do(J);
      },
    }[J.meta.version]();
  }
}
