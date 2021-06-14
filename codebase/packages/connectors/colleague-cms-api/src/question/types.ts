type Question = {
  template: QuestionTemplate;
};

type QuestionTemplate = QuestionText | QuestionSingle | QuestionMulti;

type QuestionText = {
  __component: 'question-template.text';
  answer: string;
};

type QuestionSingle = {
  __component: 'question-template.single';
  answer: string;
  options: string[];
};

type QuestionMulti = {
  __component: 'question-template.multi';
  answers: string[];
  options: string[];
};

export type {
  Question,
  QuestionTemplate,
  QuestionText,
  QuestionSingle,
  QuestionMulti,
};
