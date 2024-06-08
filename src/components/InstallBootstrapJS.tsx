import { useEffect } from 'react';

const InstallBootstrapJS = () => {
  useEffect(() => {
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap.bundle.min.js')
      : null;
  }, []);

  return <></>;
};

export default InstallBootstrapJS;
