const prisma = require("../prismaClient");

const getABlogWithComments = async (req, res) => {
  try {
    const blogs = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (!blogs) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isAuthenticated = !!req.user;

    const blog = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author.username,
      createdAt: post.createdAt,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        author: isAuthenticated ? comment.user.username : "Anonymous",
        createdAt: comment.createdAt,
      })),
    };

    res.json({
      posts: blog,
      isAuthenticated: isAuthenticated,
    });
  } catch (error) {
    console.error("Error fetching the blog post:", error);
    res.status(500).json({ message: "Error fetching the blog post" });
  }
};

const postComment = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    await prisma.comment.create({
      data: {
        content: content,
        postId: postId,
        userId: userId,
      },
    });

    return res
      .status(201)
      .json({ message: "Comment posted successfully", comment: newComment });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ message: "Error posting comment" });
  }
};

module.exports = { getABlogWithComments, postComment };
