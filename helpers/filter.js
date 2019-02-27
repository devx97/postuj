module.exports = posts =>
    posts.map(post => ({
      postId: post._id,
      pluses: post.pluses,
      author: post.author,
      content: post.content,
      createdAt: post.createdAt,
      comments: post.comments.map(comment => {
        return {
          commentId: comment._id,
          author: comment.author,
          content: comment.content,
          pluses: comment.pluses,
          createdAt: post.createdAt,
          removed: comment.removed,
        }
      })
    }))
