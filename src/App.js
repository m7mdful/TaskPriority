import { useState, useEffect } from "react";
import Tasks from "./Components/Tasks";


function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {
      importantUrgent: [],
      notImportantUrgent: [],
      importantNotUrgent: [],
      notImportantNotUrgent: [],
    };
  });
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("");



  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask || !priority) {
      alert("Please enter a task and select a priority.");
      return;
    }

    setTasks((prev) => ({
      ...prev,
      [priority]: [...prev[priority], newTask],
    }));

    setNewTask("");
    // setPriority("");
  };

  const handleDeleteTask = (priority, index) => {
    setTasks((prev) => ({
      ...prev,
      [priority]: prev[priority].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-600 flex flex-col items-center p-5">
      <div className="flex flex-wrap justify-center  pt-8">
        <div className="flex flex-auto place-items-center">
          <table className=" ">
            <tr className="">
              <td className="">
                <div className=" bg-red-300 bg-opacity-35 w-40 h-40 lg:w-96 lg:h-96 p-2 rounded-tl-lg flex flex-col overflow-auto hover:scale-105 transform duration-300">
                  {tasks.importantUrgent.map((task, index) => (
                    <Tasks
                      key={index}
                      task={task}
                      onDelete={() =>
                        handleDeleteTask("importantUrgent", index)
                      }
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className=" bg-orange-300 bg-opacity-35 w-40 h-40 lg:w-96 lg:h-96 p-2 rounded-tr-lg flex flex-col overflow-auto hover:scale-105 transform duration-300">
                  {tasks.notImportantUrgent.map((task, index) => (
                    <Tasks
                      key={index}
                      task={task}
                      onDelete={() =>
                        handleDeleteTask("notImportantUrgent", index)
                      }
                    />
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className=" bg-yellow-300 bg-opacity-35 w-40 h-40 lg:w-96 lg:h-96 p-2 rounded-bl-lg flex flex-col overflow-auto hover:scale-105 transform duration-300">
                  {tasks.importantNotUrgent.map((task, index) => (
                    <Tasks
                      key={index}
                      task={task}
                      onDelete={() =>
                        handleDeleteTask("importantNotUrgent", index)
                      }
                    />
                  ))}
                </div>
              </td>
              <td>
              <div className=" bg-green-300 bg-opacity-35 w-40 h-40 lg:w-96 lg:h-96 p-2 rounded-br-lg flex flex-col overflow-auto hover:scale-105 transform duration-300">
              {tasks.notImportantNotUrgent.map((task, index) => (
                <Tasks
                  key={index}
                  task={task}
                  onDelete={() =>
                    handleDeleteTask("notImportantNotUrgent", index)
                  }
                />
              ))}
            </div>
              </td>
            </tr>


          </table>
        </div>
      </div>
      <div className="pt-14  lg:w-1/4 lg:text-xl lg:scale-125">
        <form
          className="flex flex-col items-center gap-3 p-3 bg-neutral-500 bg-opacity-35 rounded-md"
          onSubmit={handleAddTask}
        >
          <input
            type="text"
            maxLength={31}
            className="bg-neutral-300 bg-opacity-20 p-2 rounded-md w-4/5"
            placeholder="Enter a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="prio"
                value="importantUrgent"
                onChange={(e) => setPriority(e.target.value)}
                
              />
              <label className="text-red-700">Important & Urgent</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="prio"
                value="notImportantUrgent"
                onChange={(e) => setPriority(e.target.value)}
              />
              <label className="text-orange-700">Not Important & Urgent</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="prio"
                value="importantNotUrgent"
                onChange={(e) => setPriority(e.target.value)}
              />
              <label className="text-yellow-600">Important & Not Urgent</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="prio"
                value="notImportantNotUrgent"
                onChange={(e) => setPriority(e.target.value)}
              />
              <label className="text-green-700">
                Not Important & Not Urgent
              </label>
            </div>
          </div>
          <button type="submit" className=" rounded-lg mt-3 px-4 py-2 bg-neutral-300 bg-opacity-40 transform duration-500 hover:scale-105 text-black">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
