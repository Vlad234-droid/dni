export const reloadPage = () => {
  const refresh = window.localStorage.getItem('refresh');

  if (refresh === null) {
    window.localStorage.setItem('refresh', '1');

    setTimeout(() => {
      window.localStorage.removeItem('refresh');
      window.location.reload();
    }, 300);
  }
};
