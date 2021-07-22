import { buildColleagueApiContext } from './context';
import { colleagueApiConnector } from './connector';

const test = async () => {
  const runtimeEnvironment = () => 'PROD';
  const identityClientToken = () =>
    'eyJraWQiOiIyMTM1MGE2NC02YTYxLTRiNmYtYjIyZS1lYTNkOTNiY2YyMTQiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJiMWM1MDMzYS03NGVmLTQ2NjMtOTNkYi0xYjliOGUyZTMzOGEiLCJpc3MiOiJodHRwczovL2FwaS50ZXNjby5jb20vaWRlbnRpdHkvdjQvaXNzdWUtdG9rZW4iLCJzdWIiOiIyMDMyODEzZC03MDE3LTQ4MzctODJjMy05MTgwYWVhZTk5NGYiLCJpYXQiOjE2MjY4OTA2ODQsIm5iZiI6MTYyNjg5MDY4NCwiZXhwIjoxNjI2ODk0Mjg0LCJzY29wZSI6ImludGVybmFsIHB1YmxpYyIsImNvbmZpZGVuY2VfbGV2ZWwiOjEyLCJjbGllbnRfaWQiOiIyMDMyODEzZC03MDE3LTQ4MzctODJjMy05MTgwYWVhZTk5NGYiLCJ0b2tlbl90eXBlIjoiYmVhcmVyIn0.UenzlVSGjfZ1f2WggnaR-1uMqLJ9yCb3pqor2-azdeLgIpS8-tt26DhPF1SP3QT9iDcmUo6uP5KTP0lW6YE49gyfFoJHlZWO3aCPi6r-N20Q-ucFBcCXMu_KuiR1vGa7NA721rKQ5es9TCRd0in2Ul_uVOSp_5uJ40unwbuUCjHB3VqXRZqBnPwP_mF7rhHMGA9yIH3qyuqMhFnKpkK6UaluVtLAVvehZ6JabhmJybdQhGGe4tzluWzS6ivYCk8oMuA2Gz-x3mw-dVw3LcTriSY-zb45GqsR-ZWvbpghlgBE8rP8RjkiSI-byWkyZ0t4qzWz7Gkh2ycdg7XvXRhReg';

  const colleagueApiContext = buildColleagueApiContext(runtimeEnvironment, identityClientToken);

  const colleagueApi = colleagueApiConnector(colleagueApiContext);

  try {
    let colleague = await colleagueApi.getColleague({
      params: { colleagueUUID: '6b99d3eb-b38f-484d-947c-0860f65762f6' },
    });
    console.log(JSON.stringify(colleague, undefined, 3));
  } catch (err) {
    console.error(err);
  }

  try {
    let colleagues = await colleagueApi.getColleagues({ params: { 'externalSystems.iam.id': 'UK17938703' } });
    console.log(JSON.stringify(colleagues, undefined, 3));
  } catch (err) {
    console.error(err);
  }
};

test();
