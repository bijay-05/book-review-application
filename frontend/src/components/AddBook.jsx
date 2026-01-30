export default function AddBookCard({ setShowPopup }) {
  return (
    <>
      <div className="py-4 px-8 ml-32">
        <button
          className="text-white border bg-green-600 border-b-gray-200 px-6 py-2 rounded-md"
          onClick={() => setShowPopup(true)}
        >
          Add Book
        </button>
      </div>
    </>
  );
}
