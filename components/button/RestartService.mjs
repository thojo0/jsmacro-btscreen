import { restartService } from "../../Helper.mjs";
import Base from "./Base.mjs";

export default class RestartService extends Base {
  label = "Restart Service";
  run(_, screen) {
    screen.close();
    restartService();
  }
}
