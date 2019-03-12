exports.posts = posts =>
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
          createdAt: comment.createdAt,
          removed: comment.removed,
        }
      })
    }))

exports.comments = comments =>
    comments.map(comment => ({
      commentId: comment._id,
      author: comment.author,
      content: comment.content,
      pluses: comment.pluses,
      createdAt: comment.createdAt,
      removed: comment.removed,
    }))
