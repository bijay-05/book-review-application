import { FormEvent, useState } from "react";
import { addNewBook } from "../requests/addBook";
import { useCategoryContext } from "../contexts/categoriesContext";

const BookAddPopup = ({ showPopup, setShowPopup, addBook }) => {
  const { categories } = useCategoryContext();
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    author: "",
    categoryId: "",
    file: undefined,
  });
  
  const checkFileSize = (size) => {
    if (size > 1024 * 1024) {
      return false;
    }
    return true;
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    await addNewBook(newBook);

    alert("File uploaded successfully!");
    setShowPopup(false);
    setNewBook({
      title: "",
      description: "",
      author: "",
      categoryId: "",
      file: undefined,
    });
  };

  return showPopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Book</h2>
        <form onSubmit={handleAddBook}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              rows={5}
              cols={50}
              id="description"
              value={newBook.description}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold mb-2"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, author: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold mb-2"
            >
              Category:
            </label>
            <select
              className="w-full py-2"
              defaultValue={"history"}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, categoryId: e.target.value }))
              }
            >
              {categories.data.map((category) => {
                return (
                  <option
                    className="text-lg"
                    value={category.value}
                    key={category.id}
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (checkFileSize(e.target.files[0].size)) {
                  setNewBook((prev) => ({ ...prev, file: e.target.files[0] }));
                } else {
                  alert("File Size too large");
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-sm"
          >
            Add Book
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BookAddPopup;
