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

module.exports = {
  dummy,
  totalLikes,
}
