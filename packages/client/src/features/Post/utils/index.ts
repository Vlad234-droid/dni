import { TypeDrawProgress, TypeCutString } from '../config/types';

const drawProgress: TypeDrawProgress = ({
  progress,
  colorFrom,
  colorTo,
  colorMain,
}) => {
  const backgroundString = `
    linear-gradient(90deg, 
    rgba(${colorFrom}, ${progress / 100 - 0.1}) ${progress}%,
    rgba(${colorTo}) ${progress}%), ${colorMain}
  `;

  return backgroundString;
};

const cutString: TypeCutString = ({ value, maxLength }) => {
  if (value.length > maxLength) {
    return `${value.slice(0, maxLength)}..`;
  }

  return value;
};

export { drawProgress, cutString };
