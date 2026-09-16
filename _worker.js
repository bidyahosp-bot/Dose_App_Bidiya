export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ----- مسار الـ API الوسيط -----
    if (url.pathname.startsWith('/api/counter/')) {
      const action = url.pathname.replace('/api/counter/', '');
      const workspace = 'bidiya-hosps-team-5534';
      const counter = 'users';
      const target = `https://api.counterapi.dev/v2/${workspace}/${counter}${
        action === 'up' ? '/up' : ''
      }`;

      try {
        const response = await fetch(target, {
          headers: {
            'Authorization': `Bearer ${env.COUNTER_TOKEN}`,
          },
        });
        const body = await response.text();

        return new Response(body, {
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // ----- أي مسار آخر → الملفات الثابتة (Flutter) -----
    return env.ASSETS.fetch(request);
  },
};
