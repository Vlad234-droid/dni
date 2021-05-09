declare module 'react-markdown/lib/plugins/html-parser' {
  type ParserInput = {
    isValidNode: (node: { type: string; name: string }) => boolean;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlParser: (input: ParserInput) => any;

  export default htmlParser;
}
