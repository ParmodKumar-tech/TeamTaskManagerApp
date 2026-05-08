import TaskOverview from "../../components/TaskOverview";
import AllTaskAndProject from "../../components/AllTaskAndProject";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { TaskProvider } from "../../provider/TaskProvider";
import { FormProvider } from "../../provider/FormProvider";
import { useRerender } from "../../hooks/useRerender";

function DashboardPage(){
    const {showForm} =useForm();


    return (
        <div className='overflow-x-hidden'>
        <TaskOverview />
        <AllTaskAndProject/>
        {showForm && <Form/>}   
        </div>
    )

}

export default DashboardPage;
