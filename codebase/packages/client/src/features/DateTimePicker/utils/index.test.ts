import {
  getAvailableTimeOptions,
  getDateObject,
  getTimeObject,
  getStringWithLeadingZero,
  getTimeWithLeadingZero,
  getTimeFragments,
  isTimeOptionActive,
  getTimeValue,
  isLastTimeFragment,
  getAriaLabel,
  isFragmentFilled,
  areFragmentsFilled,
  getIndexOfTimeOption,
  getTimeValidationObject,
  isTimeFragmentValid,
  isTypedValueValid,
  getAriaDescribedBy,
} from './index';

describe('#DateTimePicker utils', () => {
  describe('getAvailableTimeOptions', () => {
    it('should return an array of correct time options', () => {
      const expected = [
        { hh: '7', mm: '10' },
        { hh: '8', mm: '10' },
        { hh: '9', mm: '10' },
        { hh: '10', mm: '10' },
        { hh: '11', mm: '10' },
        { hh: '12', mm: '10' },
      ];

      expect(getAvailableTimeOptions(7, 12, 10)).toEqual(expected);
    });

    it('should return an array of default time options, if no arguments provided', () => {
      const expected = [
        { hh: '9', mm: '00' },
        { hh: '10', mm: '00' },
        { hh: '11', mm: '00' },
        { hh: '12', mm: '00' },
        { hh: '13', mm: '00' },
        { hh: '14', mm: '00' },
        { hh: '15', mm: '00' },
        { hh: '16', mm: '00' },
        { hh: '17', mm: '00' },
        { hh: '18', mm: '00' },
        { hh: '19', mm: '00' },
      ];

      expect(getAvailableTimeOptions()).toEqual(expected);
    });
  });

  describe('getDateObject', () => {
    it('should return an object with correct values for day keys', () => {
      const expected = {
        dd: '01',
        mm: '12',
        yyyy: '2020',
      };

      const dateTime = {
        year: 2020,
        month: 12,
        day: 1,
      };

      expect(getDateObject(dateTime)).toEqual(expected);
    });

    it('should return an object with empty value for day keys, if DateTime has no expected keys', () => {
      const expected = {
        dd: '',
        mm: '',
        yyyy: '',
      };

      const dateTime = {
        hour: 12,
      };

      expect(getDateObject(dateTime)).toEqual(expected);
    });

    it('should return an object with empty value for day keys, if no DateTime provided', () => {
      const expected = {
        dd: '',
        mm: '',
        yyyy: '',
      };

      expect(getDateObject()).toEqual(expected);
    });
  });

  describe('getTimeObject', () => {
    it('should return an object with correct values for time keys', () => {
      const expected = {
        hh: '07',
        mm: '03',
      };

      const dateTime = {
        hour: 7,
        minute: 3,
      };

      expect(getTimeObject(dateTime)).toEqual(expected);
    });

    it('should return an object with empty value for time keys, if DateTime has no expected keys', () => {
      const expected = {
        hh: '',
        mm: '',
      };

      const dateTime = {
        year: 2020,
      };

      expect(getTimeObject(dateTime)).toEqual(expected);
    });

    it('should return an object with empty value for time keys, if no DateTime provided', () => {
      const expected = {
        hh: '',
        mm: '',
      };

      expect(getTimeObject()).toEqual(expected);
    });
  });

  describe('getStringWithLeadingZero', () => {
    it('should add leading zero to string, if length is < 2', () => {
      expect(getStringWithLeadingZero('1')).toBe('01');
    });

    it('should return string as it is, if length is >= 2', () => {
      expect(getStringWithLeadingZero('12')).toBe('12');
    });

    it('should return string as it is, if it is empty', () => {
      expect(getStringWithLeadingZero('')).toBe('');
    });
  });

  describe('getTimeWithLeadingZero', () => {
    it('should return time object with leading zero per each fragment', () => {
      expect(getTimeWithLeadingZero({ hh: '1', mm: '1' })).toEqual({
        hh: '01',
        mm: '01',
      });
    });
  });

  describe('getTimeFragments', () => {
    it('should return an array of time fragments', () => {
      expect(getTimeFragments('hh/mm', '/')).toEqual(['hh', 'mm']);
    });

    it('should return an array of time fragments, if no arguments provided', () => {
      expect(getTimeFragments()).toEqual(['hh', 'mm']);
    });
  });

  describe('isTimeOptionActive', () => {
    it('should return true if selected time is equal to option time', () => {
      const selected = { hh: '12', mm: '10' };
      const option = { hh: '12', mm: '10' };

      expect(isTimeOptionActive(selected, option)).toBe(true);
    });

    it('should return false if only selected hours are equal to option hours', () => {
      const selected = { hh: '12', mm: '10' };
      const option = { hh: '12', mm: '35' };

      expect(isTimeOptionActive(selected, option)).toBe(false);
    });

    it('should return false if only selected minutes are equal to option minutes', () => {
      const selected = { hh: '12', mm: '10' };
      const option = { hh: '18', mm: '10' };

      expect(isTimeOptionActive(selected, option)).toBe(false);
    });
  });

  describe('getTimeValue', () => {
    it('should return empty string, if any time fragment is empty', () => {
      expect(getTimeValue({ hh: '12', mm: '' })).toBe('');
      expect(getTimeValue({ hh: '', mm: '12' })).toBe('');
    });

    it('should return string of default timeFormat with current time fragments', () => {
      expect(getTimeValue({ hh: '12', mm: '12' })).toBe('12-12');
    });
  });

  describe('isLastTimeFragment', () => {
    it('should return false, if is not last', () => {
      expect(isLastTimeFragment(0, ['hh', 'mm'])).toBe(false);
    });

    it('should return true, if is last', () => {
      expect(isLastTimeFragment(1, ['hh', 'mm'])).toBe(true);
    });
  });

  describe('getAriaLabel', () => {
    it('should return correct value', () => {
      expect(getAriaLabel({ hh: '12', mm: '10' })).toBe('Time: 12-10');
    });
  });

  describe('isFragmentFilled', () => {
    it('should return true, if value.length is the same as expected fragment length ', () => {
      expect(isFragmentFilled({ hh: '12', mm: '10' }, 'hh')).toBe(true);
    });

    it('should return false, if value.length is not the same as expected fragment length ', () => {
      expect(isFragmentFilled({ hh: '1', mm: '10' }, 'hh')).toBe(false);
    });
  });

  describe('areFragmentsFilled', () => {
    it('should return true, if all fragments filled', () => {
      expect(areFragmentsFilled({ hh: '12', mm: '10' })).toBe(true);
    });

    it('should return false, if hour fragment is not filled', () => {
      expect(areFragmentsFilled({ hh: '1', mm: '10' })).toBe(false);
    });

    it('should return false, if minute fragment is not filled', () => {
      expect(areFragmentsFilled({ hh: '12', mm: '1' })).toBe(false);
    });

    it('should return false, if both fragments are not filled', () => {
      expect(areFragmentsFilled({ hh: '1', mm: '1' })).toBe(false);
    });
  });

  describe('getIndexOfTimeOption', () => {
    it('should return an index of time option, by hour key', () => {
      const options = [
        { hh: '12', mm: '00' },
        { hh: '13', mm: '00' },
        { hh: '14', mm: '00' },
        { hh: '15', mm: '00' },
      ];

      expect(getIndexOfTimeOption(options, { hh: '14', mm: '10' })).toBe(2);
    });
  });

  describe('isTypedValueValid', () => {
    it('should return true, if no value provided', () => {
      expect(isTypedValueValid('')).toBe(true);
    });

    it('should return true, if value can be transformed to number', () => {
      expect(isTypedValueValid('02')).toBe(true);
    });

    it('should return false, if value can`t be transformed to number', () => {
      expect(isTypedValueValid('/')).toBe(false);
    });
  });

  describe('isTimeFragmentValid', () => {
    it('should return true, if no value provided', () => {
      expect(isTimeFragmentValid('hh', '')).toBe(true);
      expect(isTimeFragmentValid('mm', '')).toBe(true);
    });

    it('should return true, if value can be transformed to number and it is within the limits', () => {
      expect(isTimeFragmentValid('hh', '23')).toBe(true);
      expect(isTimeFragmentValid('mm', '59')).toBe(true);
      expect(isTimeFragmentValid('hh', '00')).toBe(true);
      expect(isTimeFragmentValid('mm', '00')).toBe(true);
    });

    it('should return false, is value is NaN', () => {
      expect(isTimeFragmentValid('hh', '/')).toBe(false);
      expect(isTimeFragmentValid('mm', '/')).toBe(false);
    });

    it('should return false, is value is out of limits', () => {
      expect(isTimeFragmentValid('hh', '47')).toBe(false);
      expect(isTimeFragmentValid('mm', '93')).toBe(false);
    });
  });

  describe('getTimeValidationObject', () => {
    it('should return expected validation object if all fragments are valid', () => {
      expect(getTimeValidationObject({ hh: '12', mm: '10' })).toEqual({
        hh: true,
        mm: true,
      });
    });

    it('should return expected validation object if hh fragment is invalid', () => {
      expect(getTimeValidationObject({ hh: '47', mm: '10' })).toEqual({
        hh: false,
        mm: true,
      });
    });

    it('should return expected validation object if mm fragment is invalid', () => {
      expect(getTimeValidationObject({ hh: '12', mm: '98' })).toEqual({
        hh: true,
        mm: false,
      });
    });
  });

  describe('getAriaDescribedBy', () => {
    it('should return undefined, if error is false', () => {
      expect(getAriaDescribedBy('mocked_id', false)).toBe(undefined);
    });

    it('should return id with error, if error is true', () => {
      expect(getAriaDescribedBy('mocked_id', true)).toBe('mocked_id-error');
    });
  });
});
