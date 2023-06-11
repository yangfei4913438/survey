export const answer = [
  // 收集（新建）答卷
  {
    url: '/api/answer',
    method: 'post',
    response(ctx) {
      console.log('query body:', ctx.request.body);
      return {
        errno: 0,
      };
    },
  },
];
