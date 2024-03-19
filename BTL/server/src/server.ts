import * as http from "http";

import { Config } from "./config";
import App from "./app";
import logger from "./utils/logger";

const port = Config.portNumber;
const server = http.createServer(App);
server.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
  // console.log(`[server]: Server is running at http://localhost:${port}`);
});
