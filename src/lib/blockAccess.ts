import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  username: string;
  photo: string;
  email: string;
  password: string;
  role: string;
};

export const blockAccess = (reqRoles: string[], router: any, route: string, message: string | null) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.setItem('message', 'You must login!');
      return router.push('/login');
    };

    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const role = decodedToken.role;

      let canAccess = false;

      reqRoles.forEach((reqRole) => {
        if (role === reqRole) {
          canAccess = true;
        };
      });

      if (!canAccess) {
        if (message) localStorage.setItem('message', message);
        return router.push(route);
      };
    } catch (error) {
      console.error('Error: ', error);
      return router.push('/login');
    };
  };
};
