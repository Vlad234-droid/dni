export const reloadPage = () => {
  const refresh = window.localStorage.getItem('refresh');

  if (refresh === null) {
    window.localStorage.setItem('refresh', Date());

    setTimeout(() => {
      window.localStorage.removeItem('refresh');
      window.location.reload();
    }, 100);
  }
};
