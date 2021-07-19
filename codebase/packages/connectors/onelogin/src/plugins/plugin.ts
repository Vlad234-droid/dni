import express from "express";

export type Optional = {
  /**
   * Optional, If set to true any error from inside the plugin,
   * will be logged but swallowed by onelogin middleware.
   * Plugin will be treated as optional and failsafe on the application side will be needed.
   * Defaults to false
   */
  optional?: boolean;
};
export type Plugin = express.RequestHandler & Optional;
