import { appErrorFromUnknown, toResponseStatus, toResponseMessage, toHTMLResponse } from '../utils/errors';
import path from 'path';

const shouldApplyPageReload = (err: Error) => {
  if (!err) return false;

  // Workaround (1) for this error:
  // Error [OneloginError]: No id token found
  //     at new OneloginError (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\index.js:21:28)
  //     at C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:274:68
  //     at step (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:44:23)
  //     at Object.throw (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:25:53)
  //     at rejected (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:17:65)
  //     at processTicksAndRejections (internal/process/task_queues.js:93:5) {
  //   flow: 'plugin',
  //   status: 500
  // }  if (err.name === 'OneloginError'
  if (err.name === 'OneloginError' && err.message.startsWith('No id token found')) {
    return true;
  }

  // Workaround (2) for this error:
  // OneloginError: Fetch error: 400 - POST https://api-ppe.tesco.com/identity/v4/issue-token/token
  //     at new OneloginError (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\index.js:21:28)
  //     at C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:274:68
  //     at step (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:44:23)
  //     at Object.throw (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:25:53)
  //     at rejected (C:\Projects\Tesco\Colleague24Repos\reporting-dni-frontend\codebase\node_modules\@energon\onelogin\dist\main\onelogin-middleware\openid-protocol\get-openid-middleware.js:17:65)
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
  if (shouldApplyPageReload(error as Error)) {
    console.log(`Page reload workaround is applying for request: ${req.originalUrl}`);
    return res.status(200).sendFile(path.resolve(path.join('public', 'reload.html')));
  }

  console.error(error);

  const appError = appErrorFromUnknown(error);
  const respStatus = toResponseStatus(appError);

  return req.url.startsWith('/api/')
    ? res.status(respStatus).json(toResponseMessage(appError))
    : res.status(respStatus).sendFile(path.resolve(path.join('public', toHTMLResponse(appError))));
};
