import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  const initialFormData = {
    id: "",
    title: "",
    content: "",
    img: "",
    category: "",
    tags: "",
    published: false,
  };

  const [postsList, setPostsList] = useState([]);
  const [post, setPost] = useState(initialFormData);
  const [editId, setIdPost] = useState("");

  function updatePostsList(newValue, fieldName) {
    const newPost = { ...post };
    newPost[fieldName] = newValue;
    setPost(newPost);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!editId) {
      setPostsList([
        ...postsList,
        {
          ...post,
          id: crypto.randomUUID(),
          img:
            post.img ||
            "https://avante.biz/wp-content/uploads/Desktop-Wallpapers-HD-Widescreen/Desktop-Wallpapers-HD-Widescreen-002.jpg",
          createdAt: new Date(),
          published: true,
        },
      ]);
      setPost(initialFormData);
    } else {
      setPostsList(
        postsList.map((el) =>
          el.id == editId
            ? {
                id: editId,
                ...post,
              }
            : el
        )
      );

      setPost(initialFormData);
      setIdPost("");
    }
  }

  function handleEditPost(postId) {
    const post = postsList.find((el) => el.id === postId);

    if (!post) {
      return;
    }

    setPost({
      title: post.title,
      content: post.content,
      img: post.img,
      category: post.category,
      tags: post.tags,
      published: post.published,
    });

    setIdPost(postId);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="text-center flex flex-col">
        <label htmlFor="post"></label>
        <input
          className="border p-3"
          value={post.title}
          type="text"
          placeholder="Insert the title of the post"
          onChange={(e) => updatePostsList(e.target.value, "title")}
        />
        <input
          className="border p-3"
          value={post.content}
          type="text"
          placeholder="Insert the content"
          onChange={(e) => updatePostsList(e.target.value, "content")}
        />
        <input
          className="border p-3"
          value={post.img}
          type="text"
          placeholder="Insert the url of the img"
          onChange={(e) => updatePostsList(e.target.value, "img")}
        />
        <select
          className="border p-3 select-transparent"
          value={post.category}
          type="select"
          onChange={(e) => updatePostsList(e.target.value, "category")}
        >
          <option value="" disabled>
            Choose a category
          </option>
          <option value="Technology and innovations">
            Technology and innovations
          </option>
          <option value="Travels and adventures">Travels and adventures</option>
          <option value="Health and wellness">Health and wellness</option>
          <option value="Art and culture">Art and culture</option>
          <option value="Food and recipes">Food and recipes</option>
          <option value="Finance and investments">
            Finance and investments
          </option>
        </select>

        <input
          className="border p-3"
          value={post.tags}
          type="text"
          placeholder="Insert the tags"
          onChange={(e) => updatePostsList(e.target.value, "tags")}
        />
        <button
          type="submit"
          className="border p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-800 w-20 m-auto mt-5"
        >
          {editId.length > 0 ? "Save" : "Create"}
        </button>
      </form>

      <PostList
        singlePost={post}
        posts={postsList}
        setPostsList={setPostsList}
        postsList={postsList}
        setPost={setPost}
        useEffect={useEffect}
        handleEditPost={handleEditPost}
      />
    </>
  );
}

export default App;
