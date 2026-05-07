import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { createTask, updateTask } from "../api/task.api";
import toast from "react-hot-toast";
import { createProject, updateProject } from "../api/project.api";

function Form() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { role,
    mode,
    setShowForm,
    selectedData,
    setSelectedData,
    reRenderComponent,
     } = useAuth();

  useEffect(() => {
    if (selectedData) {
        reset({
        ...selectedData,
        memberId: selectedData.members
          ? selectedData.members.map((member) => member._id || member).join(", ")
          : "",
        dueDate: selectedData.dueDate
          ? new Date(selectedData.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      reset({});
    }
  }, [selectedData, mode, reset]);

  const addTaskFormFields = [
    { label: "Task Name", name: "taskName", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: ["pending", "in-progress", "completed"],
    },
    { label: "Project Id", name: "projectId", type: "text" },
    { label: "Assigned to", name: "assignedTo", type: "text" },
    { label: "Due Date", name: "dueDate", type: "date" },

  ];

  const addProjectFormFields = [
    { label: "Project Name", name: "projectName", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Member Ids", name: "memberId", type: "text" },
    { label: "Due Date", name: "dueDate", type: "date" },
  ];

  const statusField = [
    {
      label: "Status",
      name: "status",
      type: "select",
      options: ["pending", "in-progress", "completed"],
    },
  ];

  const fields =
    role === "member"
      ? statusField
      : mode === "task"
      ? addTaskFormFields
      : addProjectFormFields;

  const onSubmit = async (data) => {    
      
      const toastId = toast.loading("please wait...");
      if (mode === "task") {
        if (selectedData?._id) {
          const res= await updateTask(selectedData._id,{status:data.status});
            if(res.success){
                reRenderComponent()
                toast.success(res.message);
            }
            else{
                toast.error(res.message);
            }
        } 
        else {
          const res = await createTask(data);
          if (res.success) {
            reRenderComponent()
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        }
      } 
      else {
        const { members, _id, createdAt, updatedAt, __v , ...restData } = data;
        const projectData = {
          ...restData,
          memberId: data.memberId
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean),
        };


        if (selectedData?._id) {
            const {tasks, ...restProjectData}=projectData;
            const res=await updateProject(_id,restProjectData);

            if(res.success){
                reRenderComponent();
                toast.success(res.message);
            }
            else{
                toast.error(res.member);
            }



        } else {
          const res = await createProject(projectData);
          if (res.success) {
            reRenderComponent();
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        }
      }

      setShowForm(false);
      setSelectedData(null);
      reset({});
      toast.dismiss(toastId);

  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-400 flex flex-col p-5 rounded-xl shadow-md my-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 lg:w-[40%] max-h-[90vh] overflow-y-auto border-4 border-black"
        
      >
        <h1 className="text-white font-bold text-3xl mb-2 text-center">
          {role === "member"
            ? "Update Status"
            : mode === "task"
            ? "Create New Task"
            : "Create New Project"}
        </h1>

        {fields.map((field) => (
          <div key={field.name} className="flex flex-col my-2">
            <div className="flex flex-wrap gap-2">
              <label className="font-bold">{field.label}</label>
              <p className="text-white italic">
                {errors[field.name] && errors[field.name].message}
              </p>
            </div>

            {field.type === "select" ? (
              <select
                {...register(field.name, { required: "*Required" })}
                className="w-full bg-green-100 p-4 rounded my-1 text-black"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                {...register(field.name, { required: "*Required" })}
                rows={3}
                placeholder={`Enter ${field.label}`}
                className="w-full bg-green-100 p-4 rounded  text-black resize-none"
              />
            ) : (
              <input
                type={field.type}
                {...register(field.name, { required: "*Required" })}
                placeholder={`Enter ${field.label}`}
                className="w-full bg-green-100 p-4 rounded my-1 text-black"
              />
            )}
          </div>
        ))}

        <div className="flex flex-wrap justify-between p-2">
          <button
            type="button"
            className="bg-white p-2 rounded"
            onClick={() => {
              setShowForm(false);
              setSelectedData(null);
              reset({});
            }}
          >
            Cancel
          </button>
          <button type="submit" className="bg-green-700 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;