import 'expo-router/entry';

import { createServer, Response, Server } from 'miragejs';

declare global {
  interface Window {
    server: Server;
  }
}

if (__DEV__) {
  if (window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.post('/login', (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        if (username === 'huun' && password === '123456') {
          return {
            accessToken: '1234567890',
            refreshToken: '1234567890',
            user: {
              id: 'huun',
            },
          };
        }

        return new Response(
          401,
          {},
          { message: 'Invalid username or password' }
        );
      });
    },
  });
}
