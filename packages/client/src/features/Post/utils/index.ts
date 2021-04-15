interface CutStringProps {
  name: string;
  format: string;
  maxLength: number;
  dots?: string;
}

const cutString = ({
  name,
  maxLength,
  format,
  dots = '..',
}: CutStringProps) => {
  if (name.length > maxLength) {
    return `${name.slice(
      0,
      maxLength - format.length - dots.length,
    )}${dots}${format}`;
  }

  return name;
};


export { cutString };
