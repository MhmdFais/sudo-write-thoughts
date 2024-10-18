const prisma = require("../../prismaClient");

const getBlogs = async (req, res) => {
  try {
    const blogPosts = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPosts = blogPosts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author.username,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: comment.user.username,
      })),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.log("Error fetching posts for admin:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const postBlogs = async (req, res) => {
  const { title, content, isPublished } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: isPublished,
        authorId: req.user.id,
      },
    });

    console.log("New post created:", newPost.id);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating new post:", error);
    res.status(500).json({ message: "Error creating new post" });
  }
};

const getFilteredBlogs = async (req, res) => {
  const publishedStatus = req.path === "/published";

  try {
    const filteredPosts = await prisma.post.findMany({
      where: {
        published: publishedStatus,
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPosts = filteredPosts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author.username,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: comment.user.username,
      })),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.log(
      `Error fetching ${publishedStatus ? "published" : "unpublished"} posts:`,
      error
    );
    res.status(500).json({
      message: `Error fetching ${
        publishedStatus ? "published" : "unpublished"
      } posts`,
    });
  }
};

const changePublishStatus = async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(req.params.postId),
      },
      data: {
        published: false,
      },
    });

    res.status(200).json({ message: "Post unpublished successfully", post });
  } catch (error) {
    console.error("Error unpublishing post:", error);
    res.status(500).json({ message: "Failed to unpublish post" });
  }
};

const changeUnPublishStatus = async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(req.params.postId),
      },
      data: {
        published: true,
      },
    });

    res.status(200).json({ message: "Post published successfully", post });
  } catch (error) {
    console.error("Error publishing post:", error);
    res.status(500).json({ message: "Failed to publish post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);

    // Delete comments post with cmments, All fail or pass
    const deletePostWithComments = await prisma.$transaction(async (prisma) => {
      await prisma.comment.deleteMany({
        where: {
          postId: postId,
        },
      });

      // Delete the post itself
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return deletedPost;
    });

    res
      .status(200)
      .json({
        message: "Post and associated comments deleted successfully",
        deletedPost: deletePostWithComments,
      });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post and comments" });
  }
};

module.exports = {
  getBlogs,
  getFilteredBlogs,
  postBlogs,
  changePublishStatus,
  changeUnPublishStatus,
  deletePost,
};
