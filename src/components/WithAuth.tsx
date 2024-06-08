import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserData } from '../types';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      try {
        const userDataJSON: string = localStorage.getItem('userData') || '';
        if (!userDataJSON) throw new Error('User data not found');
        const userData: UserData = JSON.parse(userDataJSON);
        const { document, companyId, companyName} = userData;
        if (!document || !companyId || !companyName) {
          throw new Error('User data is incomplete');
        }
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
