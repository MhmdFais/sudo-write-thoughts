import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API_KEY = import.meta.env.VITE_MCE_API_KEY;

  const handleEditorChange = (content) => {
    setContent(content);
  };

  return (
    <div>
      <form>
        <div className="mt-6">
          <label
            htmlFor="title"
            className="block text-gray-300 text-4xl font-bold mb-4"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-3xl"
            type="textArea"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="mt-6">
          <label
            htmlFor="content"
            className="block text-gray-300 text-4xl font-bold mb-4"
          >
            Content
          </label>
          <Editor
            apiKey={API_KEY}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-6 mt-6">
          <div className="submitButton">
            <button
              className="bg-yellow-300 hover:bg-yellow-400 w-full text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
              type="submit"
            >
              Publish
            </button>
          </div>
          <div className="draftButton">
            <button
              className="bg-slate-400 hover:bg-slate-500 w-full text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
              type="submit"
            >
              Save in Drafts
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateArticle;
