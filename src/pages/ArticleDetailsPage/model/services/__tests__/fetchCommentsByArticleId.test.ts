import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId';

const data = [{
  id: 1,
  text: 'some comment 1',
  createdAt: '30.07.2023',
  articleId: 1,
  userId: 1,
},
{
  id: 2,
  text: 'some comment 2',
  createdAt: '30.07.2023',
  articleId: 1,
  userId: 1,
},
{
  id: 3,
  text: 'some comment 3',
  createdAt: '30.07.2023',
  articleId: 1,
  userId: 1,
}];

describe('fetchCommentsByArticleId.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toBeCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
