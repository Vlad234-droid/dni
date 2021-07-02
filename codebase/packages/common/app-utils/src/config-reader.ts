export const configReader = <TConfig extends object>(initialConfig: TConfig) => {
  let config = initialConfig;

  return {
    getConfig: () => config,
    getValueFor: <TField extends keyof TConfig>(field: TField): TConfig[TField] => config[field],
    setConfig: (newConfig: TConfig) => (config = newConfig),
    setValueFor: <TField extends keyof TConfig>(field: TField, value: TConfig[TField]) => (config[field] = value),
  };
};
