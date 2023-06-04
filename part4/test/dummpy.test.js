const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
  ];

  const listWithNoBlogs = [];

  const listWithFiveLikes = [
    {
      title: 'Blog 1',
      author: 'Author 1',
      likes: 3,
    },
    {
      title: 'Blog 2',
      author: 'Author 2',
      likes: 2,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(17);
  });

  test('when list has no blogs, equals 0', () => {
    const result = listHelper.totalLikes(listWithNoBlogs);
    expect(result).toBe(0);
  });

  test('when list has five likes in total, equals 5', () => {
    const result = listHelper.totalLikes(listWithFiveLikes);
    expect(result).toBe(5);
  });
});

describe('Author with more likes', () => {
  const listAuthors = [
    {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    },
    {
      author: 'Robert C. Martin',
      likes: 3,
    },
    {
      author: 'J. R. R. Tolkien',
      likes: 0,
    },
  ];

  test('more likes must return Edsger W. Dijkstra', () => {
    const result = listHelper.mostLikes(listAuthors);
    expect(result).toBe('Edsger W. Dijkstra');
  });
});
