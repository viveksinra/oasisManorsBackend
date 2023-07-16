'use client';
import React,{useState, useEffect, forwardRef,useRef,useImperativeHandle} from 'react'
import {Grid, AppBar,Toolbar,Box,Typography,TextField, Button,Tooltip,} from '@mui/material/';
import {FaUserPlus } from "react-icons/fa";
import {FiFileMinus,FiCheck } from "react-icons/fi";
import {BsTable } from "react-icons/bs";
import {ToggleFab} from "../page"
import { DataGrid } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";
import { prospectService,employeeService } from "../../../services";


function TasksTab({prospectId}) {
  const [taskId, setTaskId] = useState("")
  const [viewTabular,toggleView] = useState(true);
  const entryRef = useRef();
  return (
    <main style={{marginTop:20}}> 
      {viewTabular ? <SearchTask prospectId={prospectId}  handleEdit={(id)=>{toggleView(false); setTaskId(id)}} />  : <EntryTask taskId={taskId} setTaskId={e=>setTaskId(e)} prospectId={prospectId} ref={entryRef}/>}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0,background:"#d6f9f7"}}>
      <Toolbar variant="dense">
        <span style={{flexGrow:0.2}}/>
        {!viewTabular &&  <Button variant="contained" onClick={()=>entryRef.current.handleClear()} startIcon={<FiFileMinus />} size='small' color="info" >
            Clear
          </Button> }
        <span style={{flexGrow:0.3}}/>
        <Tooltip arrow title={viewTabular ? "Add Contact" : "Show All"}>
        <ToggleFab onClick={()=>toggleView(!viewTabular)} color="secondary" size="medium">
        {viewTabular ?   <FaUserPlus style={{fontSize:24}}/> : <BsTable style={{fontSize:24}}/>}
        </ToggleFab>
        </Tooltip>
          <span style={{flexGrow:0.3}}/>
          {!viewTabular && <Button variant="contained" onClick={() => entryRef.current.handleSubmit()} startIcon={<FiCheck />} size='small' color="success" >
            {taskId ? "Update" : "Save"}
          </Button>}
          
      </Toolbar>         
      </AppBar>
       </main>
  )
}



function SearchTask({prospectId, handleEdit}) {
  const [rows, setRow] = useState([]);
  useEffect(() => {
    async function fetchAllData() {
      let response = await prospectService.getTask(prospectId, "");
      if(response.variant === "success"){
        setRow(response?.data)
      }else console.log(response)
    }
    fetchAllData()
  }, [])


  const columns = [
    {
      field: 'date',
      headerName: 'Create Date',
      type: 'text',
      width: 150,
      editable: false,
    },
    {
      field: 'employeeFullName',
      headerName: 'Task For',
      width: 150,
      editable: false,
    },
    {
      field: 'task',
      headerName: 'Task Name',
      width: 150,
      editable: false,
    },
    {
      field: 'taskType',
      headerName: 'Task Type',
      width: 150,
      editable: false,
    },
    {
      field: 'taskDueDate',
      headerName: 'Task Due Date',
      type: 'text',
      width: 150,
      editable: false,
    },
    {
      field: 'taskDueTime',
      headerName: 'Task Due Time',
      type: 'text',
      width: 150,
      editable: false,
    },
    {
      field: 'taskStatus',
      headerName: 'Task Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      renderCell: props=> <Button onClick={()=>handleEdit(props?.row?._id)} variant="text">Edit</Button>,
    },
  ];

  return (
    <main>
      <Box sx={{background:"#fff", borderRadius:"10px", width: '100%' }}>
      <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>All Tasks</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Box>
    </main>
  )
}

const EntryTask = forwardRef((props, ref) => {
  const [employee, setEmployee] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [taskDueDate, setDue] = useState("");
  const [taskDueTime, setTime] = useState("");
  const [task, setTask] = useState("");
  const [allEmployee, setAllEmp] = useState([]);
  const [allTaskTypes]= useState([{label:"Email",id:"sd445245"},{label:"Phone call",id:"sd4sds45245"},{label:"Tour Facility",id:"sdsdsd5245"}])
  const snackRef = useRef();
  useEffect(() => {
    async function getData() {
      try {
        let res = await prospectService.getTask(props.prospectId, props.taskId);
       if(res.variant === "success"){
        props.setTaskId(res.data._id);
        setEmployee(res.data.employee);
        setTaskType(res.data.taskType);
        setDue(res.data.taskDueDate);
        setTime(res.data.taskDueTime)
        setTask(res.data.task);
         snackRef.current.handleSnack(res);
       }else snackRef.current.handleSnack(res);            
      } catch (error) {
       console.log(error);
       snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
      } 
    }
    if(props.taskId){getData()}
    
  }, [props.taskId])
  useEffect(() => {
    async function fetchAllData() {
      let response = await employeeService.getEmployee("api/v1/employee/basic/getEmployee/getAll", "");
      if(response.variant === "success"){
        setAllEmp(response.data)
      }else console.log(response)
    }
    fetchAllData()
  }, [])
  const handleClear=()=>{
    props.setTaskId("");
    setEmployee(null);
    setTaskType(null);
    setDue("");
    setTime("");
    setTask("");
  }
 useImperativeHandle(ref, () => ({
      handleSubmit: async () => {
         try {
          let taskData = {prospectId:props.prospectId, employee,taskType,taskDueDate,taskDueTime,task };
          let response = await prospectService.saveTask(props.taskId, taskData);
         if(response.variant === "success"){
           snackRef.current.handleSnack(response);
           handleClear();
         }else  snackRef.current.handleSnack(response?.response?.data);            
        } catch (error) {
         console.log(error);
         snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
        } 
         
     },
     handleClear: () => handleClear()
  
 }));
 
return (
<main style={{backgroundColor:"#fff", borderRadius:8,marginBottom:2, padding:"10px"}}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Add New Tasks</Typography>
      </Grid>
    <Grid item xs={12} md={3}>
    <TextField disabled fullWidth label="Assisted Living Retirement Homes" variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
            id="taskFor"
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={opt=> `${opt?.lastName} ${opt?.firstName}`}
            options={allEmployee}
            onChange={(e, v) => {
            setEmployee(v);
            }} 
            renderOption={(props, option) => {
              return (
                <li {...props} key={option._id}>
                  {`${option?.lastName} ${option?.firstName}`}
                </li>
              );
            }}
            value={employee}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Task For"/>}
    />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
            id="taskType"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={allTaskTypes}
            onChange={(e, v) => {
            setTaskType(v);
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            value={taskType}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Task Type"/>}
    />
   
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField fullWidth type="date" value={taskDueDate} onChange={e=>setDue(e.target.value)} focused label="Task Due Date" variant="standard" />   
    </Grid>
  
    <Grid item xs={12} md={1}>
    <TextField fullWidth type="time" value={taskDueTime} onChange={e=>setTime(e.target.value)} focused label="Task Due Time" variant="standard" />   
    </Grid>
        <Grid item xs={12} md={12}>
        <TextField label="Task / Remarks" rows={6} value={task} onChange={e=>setTask(e.target.value)} multiline placeholder='Type Task...' fullWidth variant="outlined" />   
        </Grid>
    </Grid>
    <MySnackbar ref={snackRef} />
   </main>
)
});




export default TasksTab