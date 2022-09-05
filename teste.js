import { execa } from "execa";
import Listr from "listr";

const tasks = new Listr([
  {
    title: "Install package dependencies with Yarn",
    task: (ctx, task) =>
      execa("yrn").catch(() => {
        ctx.yarn = false;

        task.skip("Yarn not available, install it via `npm install -g yarn`");
      }),
  },
  {
    title: "Install package dependencies with npm",
    enabled: (ctx) => ctx.yarn === false,
    task: () => execa("npm", ["install"]),
  },
]);
tasks.run().catch((err) => {
  console.error(err);
});
