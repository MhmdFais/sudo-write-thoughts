const prisma = require("../../prismaClient");

let allBlogsArray = [];

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
  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: !isPublished,
        authorId: req.user.id,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error creating new post:", error);
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

module.exports = {
  getBlogs,
  getFilteredBlogs,
  postBlogs,
};
