const prisma = require("../prismaClient");

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
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

    const isAuthenticated = !!req.user;

    const allPosts = posts.map((post) => ({
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
    }));

    console.log(allPosts);

    res.json({
      posts: allPosts,
      isAuthenticated: isAuthenticated,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

module.exports = { getAllPosts };
