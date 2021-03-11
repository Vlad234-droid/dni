interface SplitFileToChunksProps {
  file: File;
  kbyte: number;
}

const splitFileToChunks = ({ file, kbyte }: SplitFileToChunksProps) => {
  const step = 1024 * kbyte;
  const chunks: Blob[] = [];
  const interval = { from: 0, to: step };
  const chunkAmount = Math.round(file.size / step) + 1;

  for (let i = 0; i < chunkAmount; i++) {
    chunks[chunks.length] = file.slice(interval.from, interval.to);
    interval.from += step;
    interval.to += step;
  }

  return chunks;
};

interface BuildBase64StringProps {
  output: Uint8Array[];
}

const buildBase64String = ({ output }: BuildBase64StringProps) => {
  let arrayBufferString = '';

  for (const chunk of output) {
    for (const byte of chunk) {
      arrayBufferString += String.fromCharCode(byte);
    }
  }

  return btoa(arrayBufferString);
};

interface BuildFileReaderProps {
  file: File;
  cleanStorage: () => void;

  onLoadProgress: ({
    name,
    progress,
  }: {
    name: string;
    progress: number;
  }) => void;

  onLoadSuccess: ({
    name,
    base64String,
  }: {
    name: string;
    base64String: string;
  }) => void;

  onLoadError: ({ name }: { name: string }) => void;
}

interface BuildFileReaderReturn {
  reader: FileReader;
  onStart: () => void;
}

type BuildFileReader = (props: BuildFileReaderProps) => BuildFileReaderReturn;

const buildFileReader: BuildFileReader = ({
  file,
  cleanStorage,
  onLoadError,
  onLoadProgress,
  onLoadSuccess,
}) => {
  const chunks = splitFileToChunks({ file, kbyte: 8 });
  const reader = new FileReader();
  const output: Uint8Array[] = [];
  const { name } = file;

  let index = 0;

  reader.onabort = () => {
    cleanStorage();
  };

  reader.onerror = () => {
    cleanStorage();

    onLoadError({ name });
  };

  reader.onprogress = () => {
    const rate = 100 / chunks.length;
    const progress = index * rate + rate;

    onLoadProgress({ name, progress });
  };

  reader.onload = () => {
    const { result } = reader;
    const arrayBufferView = new Uint8Array(result as ArrayBuffer);

    output[output.length] = arrayBufferView;

    if (output.length === chunks.length) {
      return setTimeout(() => {
        const base64String = buildBase64String({ output });

        onLoadSuccess({ name, base64String });
      }, 100);
    }

    index++;
    reader.readAsArrayBuffer(chunks[index]);
  };

  reader.onloadend = () => {
    if (output.length === chunks.length) {
      cleanStorage();
    }
  };

  return {
    reader,
    onStart: () => reader.readAsArrayBuffer(chunks[0]),
  };
};

export { buildFileReader };
