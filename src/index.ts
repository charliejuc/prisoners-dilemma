import path from "path";
import { cooperateSmoothed } from "./modes/CooperateSmoothed";
import { saveJSONFile } from "./utils";

const players = cooperateSmoothed();

const filePath = path.join(__dirname, "players.json");
saveJSONFile(players, filePath);
