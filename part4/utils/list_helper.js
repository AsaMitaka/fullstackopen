const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blog) => {
  return blog.reduce((acc, reducer) => acc + reducer.likes, 0);
};

const mostLikes = (blogs) => {
  let author = blogs[0].author;
  let maxLikes = blogs[0].likes;

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      author = blogs[i].author;
    }
  }

  return author;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
};
