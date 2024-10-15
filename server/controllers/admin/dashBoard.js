const prisma = require("../../prismaClient");

let allBlogsArray = [];

const getBlogs = async (req, res) => {
  try {
    const blogPosts = await prisma.post.findMany({
      include: {
        comments: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    allBlogsArray = blogPosts;

    res.status(200).json(blogPosts);
  } catch (error) {
    console.log("Error fetching posts for admin:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getFilteredBlogs = (publishedStatus) => {
  return allBlogsArray.filter((post) => post.published === publishedStatus);
};

module.exports = {
  getBlogs,
  getFilteredBlogs,
};
