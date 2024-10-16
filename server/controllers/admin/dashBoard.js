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

const getFilteredBlogs = (publishedStatus) => {
  return allBlogsArray.filter((post) => post.published === publishedStatus);
};

module.exports = {
  getBlogs,
  getFilteredBlogs,
  postBlogs,
};
