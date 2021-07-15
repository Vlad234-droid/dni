import { appErrorFromUnknown, toResponseStatus, toResponseMessage, toHTMLResponse } from '../utils/errors';
import path from 'path';

const shouldApplyPageReload = (err: Error) => {
  if (!err) return false;

  // Workaround (1) for this error:
  // Error [OneloginError]: No id token found
  //     at new OneloginError (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\index.js:21:28)
  //     at .\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:274:68
  //     at step (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:44:23)
  //     at Object.throw (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:25:53)
  //     at rejected (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:17:65)
  //     at processTicksAndRejections (internal/process/task_queues.js:93:5) {
  //   flow: 'plugin',
  //   status: 500
  // }  if (err.name === 'OneloginError'
  if (err.name === 'OneloginError' && err.message.startsWith('No id token found')) {
    return true;
  }

  // Error [OneloginError]: passport.authenticate failed: tokenSet is missing
  //     at new OneloginError (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\index.js:21:28)
  //     at .\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:194:59
  //     at step (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:44:23)
  //     at Object.next (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:25:53)
  //     at fulfilled (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:16:58)
  //     at runMicrotasks (<anonymous>)
  //     at processTicksAndRejections (internal/process/task_queues.js:93:5) {
  //   flow: 'login',
  //   status: 500
  // }
  if (err.name === 'OneloginError' && err.message.startsWith('passport.authenticate failed')) {
    return true;
  }

  // Workaround (2) for this error:
  // OneloginError: Fetch error: 400 - POST https://api-ppe.tesco.com/identity/v4/issue-token/token
  //     at new OneloginError (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\index.js:21:28)
  //     at .\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:274:68
  //     at step (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:44:23)
  //     at Object.throw (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:25:53)
  //     at rejected (.\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:17:65)
  //     at processTicksAndRejections (internal/process/task_queues.js:93:5)
  if (
    err.name === 'OneloginError' &&
    err.message.startsWith('OneloginError: Fetch error: 400 - POST ') &&
    err.message.endsWith('/identity/v4/issue-token/token')
  ) {
    return true;
  }

  return false;
};

export const errorHandler: ErrorMiddleware = (error: unknown, req, res, _) => {
  // console.log(` ==> !!! IN ERROR HANDLER !!!`);

  console.log(error);

  const isViewPath = (p: String) => !p.match('^(/api|/auth)');
  const isView = isViewPath(req.path);

  // console.log(` ==> !!! path: ${req.path}, is view path: ${isView}`);
  // if (isView && shouldApplyPageReload(error as Error)) {
  //   console.log(` ==> !!! Page reload workaround is applying for request: ${req.originalUrl}`);
  //   return res.status(200).sendFile(path.resolve(path.join('public', 'reload.html')));
  // }

  const appError = appErrorFromUnknown(error);
  const respStatus = toResponseStatus(appError);

  return isView
    ? res.status(respStatus).sendFile(path.resolve(path.join('public', toHTMLResponse(appError))))
    : res.status(respStatus).json(toResponseMessage(appError));
};
