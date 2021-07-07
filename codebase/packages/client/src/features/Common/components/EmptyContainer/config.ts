enum Level {
  ERROR,
  WARNING,
  INFO,
}

type LevelProps = {
  level: Level;
};

const DEFAULT_DESCRIPTION = 'Something went wrong';
const DEFAULT_EXPLANATION =
  'Unfortunately, we did not find any matches for your request. Please change your filtering criteria to try again.';

export type { LevelProps };
export { Level, DEFAULT_DESCRIPTION, DEFAULT_EXPLANATION };
