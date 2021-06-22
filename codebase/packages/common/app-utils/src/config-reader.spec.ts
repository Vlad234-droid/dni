import { configReader } from './config-reader';

describe('configReader', () => {
  type ExampleConfig = {
    backDateTempChangesEnabled: boolean;
    midWeekLeaversEnabled: boolean;
    blockedStores: number[];
  };

  const initial: ExampleConfig = {
    backDateTempChangesEnabled: false,
    midWeekLeaversEnabled: false,
    blockedStores: [1],
  };

  const config = configReader<ExampleConfig>(initial);

  beforeEach(() => config.setConfig(initial));

  it('getConfig should return whole config', () => {
    expect(config.getConfig()).toEqual(initial);
  });

  it('getValue should return value for field', () => {
    expect(config.getValueFor('backDateTempChangesEnabled')).toEqual(false);
    expect(config.getValueFor('midWeekLeaversEnabled')).toEqual(false);
    expect(config.getValueFor('blockedStores')).toEqual([1]);
  });

  it('setConfig should update config value', () => {
    const newConfig: ExampleConfig = {
      backDateTempChangesEnabled: false,
      midWeekLeaversEnabled: false,
      blockedStores: [1, 2, 3],
    };

    config.setConfig(newConfig);

    expect(config.getConfig()).toEqual(newConfig);
  });

  it('setValueFor should update config field value', () => {
    config.setValueFor('backDateTempChangesEnabled', true);
    expect(config.getValueFor('backDateTempChangesEnabled')).toEqual(true);

    config.setValueFor('midWeekLeaversEnabled', true);
    expect(config.getValueFor('midWeekLeaversEnabled')).toEqual(true);

    config.setValueFor('blockedStores', [10, 20, 30]);
    expect(config.getValueFor('blockedStores')).toEqual([10, 20, 30]);
  });
});
