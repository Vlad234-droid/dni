import { DragEvent } from 'react';
import { Attachment } from '../config/types';

interface GetFileProps {
  attachments: Attachment[];
  name: string;
}

const getAttachment = ({ attachments, name }: GetFileProps) => {
  return attachments.find((element) => element.name === name);
};

interface GetFileFormatProps {
  name: string;
}

const getFileFormat = ({ name }: GetFileFormatProps) => {
  return name.slice(name.lastIndexOf('.') + 1);
};

interface CutFileNameProps {
  name: string;
  format: string;
  maxLength: number;
  dots?: string;
}

const cutFileName = ({
  name,
  maxLength,
  format,
  dots = '..',
}: CutFileNameProps) => {
  if (name.length > maxLength) {
    return `
      ${name.slice(0, maxLength - format.length - dots.length)}
      ${dots}
      ${format}
    `;
  }

  return name;
};

const resetMouseEvent = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

export { getAttachment, cutFileName, resetMouseEvent, getFileFormat };

export { buildFileReader } from './buildFileReader';
