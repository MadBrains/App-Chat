export const getLocationOrigin = (isRedirect?: boolean) => {
  if (typeof window !== 'undefined') {
    if (window.location.origin !== 'http://localhost:3000') {
      return window.location.origin;
    } else {
      if (isRedirect) {
        return 'http://localhost:3000';
      } else {
        return 'http://localhost:8080';
      }
    }
  }

  return '';
};
