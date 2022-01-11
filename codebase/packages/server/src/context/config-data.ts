import { ColleagueCmsApiConfig } from "@dni-connectors/colleague-cms-api";

/**
 *
 */
export type ContextConfigData = ColleagueCmsApiConfig & {
  runtimeEnvironment: () => string;
};
