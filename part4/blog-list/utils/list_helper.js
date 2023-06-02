const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    const sumLikes = blogs.reduce((acc, current) => acc + current.likes, 0)
    return sumLikes
  }
}

const favoriteBlog = (blogs) => {
  let highestLikeCount = 0
  for (let blog of blogs) {
    if (blog.likes > highestLikeCount) {
      highestLikeCount = blog.likes
    }
  }
  return blogs.find((blog) => blog.likes === highestLikeCount)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
