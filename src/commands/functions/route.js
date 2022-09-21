import { AddRoute } from "../scripts/routes/index.js";
import { AskForMissing } from "../utils/ask.js";

export const RouteHandler = async (argv, params) => {
    argv = await AskForMissing(params || routeAskOptions, argv);
    const { name } = argv;
      AddRoute(name);
  };

export const routeAskOptions = [
    {
      name: "name",
      message: "Digte o nome da rota:",
      default: undefined,
    }
  ];