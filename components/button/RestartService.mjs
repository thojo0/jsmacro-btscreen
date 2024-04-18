import { restartService } from "../../Helper.mjs";
import ButtonComponent from "../ButtonComponent.mjs";

export default class RestartService extends ButtonComponent {
  label = "Restart Service";
  run(_, screen) {
    screen.close();
    restartService();
  }
}
