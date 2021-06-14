import FormData from 'form-data';

export const formData: Middleware = (req, _, next) => {
  const data = new FormData();

  Object.keys(req.body).map((key) => data.append(key, req.body[key]));

  if (Array.isArray(req.files)) {
    req.files.forEach((file) =>
      data.append('files', file.buffer, { filename: file.originalname }),
    );
  }

  req.body = data;
  next();
};
