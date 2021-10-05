import express from 'express';

export type Optional = {
  /**
   * Optional, If set to true any error from inside the plugin,
   * will be logged but swallowed by onelogin middleware.
   * Plugin will be treated as optional and failsafe on the application side will be needed.
   * Defaults to false
   */
  optional?: boolean;
};

interface PluginHandler {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
  (req: express.Request, res: express.Response): Promise<void | express.Response>;
}

export type Plugin = PluginHandler & Optional & { info: string };
