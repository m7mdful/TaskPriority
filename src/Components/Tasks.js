export default function Tasks({ task, onDelete }) {
  return (
    <div className="flex justify-between items-center gap-2 py-1">
      <h1 className="font-semibold text-black lg:text-3xl truncate">{task}</h1>
      <button
        onClick={onDelete}
        className="text-neutral-800 lg:text-lg  hover:text-red-800 hover:scale-105 transform duration-500"
      >
        X
      </button>
    </div>
  );
}
