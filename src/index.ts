import path from "path";
import { cooperatePlayerTypes } from "./modes/CooperatePlayerTypes";
import { saveJSONFile } from "./utils";

const players = cooperatePlayerTypes({
  iterations: 25,
  badPlayersLength: 10,
  goodPlayersLength: 20,
  reactivePlayersLength: 10,
});

const filePath = path.join(__dirname, "files", "players.json");
saveJSONFile(players, filePath);
