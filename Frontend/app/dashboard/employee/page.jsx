'use client';
import React, { Suspense, lazy, useEffect } from 'react'
import {Typography, Fab,styled, Avatar, Box,ButtonGroup,AppBar,Toolbar, Button,Tooltip} from '@mui/material/';
import { useState,useRef} from 'react';
import { employeeService } from "../../services";
import { FiCheck,FiFileMinus } from "react-icons/fi";
import {FaUserPlus } from "react-icons/fa";
import {BsTable } from "react-icons/bs";
import { DataGrid } from '@mui/x-data-grid';
import Loading from "../../Components/Loading/Loading";
const EntryArea = lazy(() => import("./EntryArea"));




function   Employee () {
  const [viewTabular,toggleView] = useState(true);
  const [id, setId] =useState("");
  const entryRef = useRef();
  return (
    <main> 
      {viewTabular ? <Suspense fallback={<Loading/>} > <SearchArea handleEdit={(id)=>{toggleView(false); setId(id)}} />  </Suspense>   : <Suspense fallback={null}><EntryArea ref={entryRef} id={id} setId={(e)=>setId(e)}/> </Suspense>}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0,background:"#d6f9f7"}}>
      <Toolbar variant="dense">
        <span style={{flexGrow:0.2}}/>
        {!viewTabular &&  <Button variant="contained" onClick={() => entryRef.current.handleClear()} startIcon={<FiFileMinus />} size='small' color="info" >
            Clear
          </Button> }
        <span style={{flexGrow:0.3}}/>
        <Tooltip arrow title={viewTabular ? "Add Prospect" : "Show All"}>
        <ToggleFab onClick={()=>toggleView(!viewTabular)} color="secondary" size="medium">
        {viewTabular ?   <FaUserPlus style={{fontSize:24}}/> : <BsTable style={{fontSize:24}}/>}
        </ToggleFab>
        </Tooltip>
          <span style={{flexGrow:0.3}}/>
          {!viewTabular && <Button variant="contained" onClick={() => entryRef.current.handleSubmit()} startIcon={<FiCheck />} size='small' color="success" >
            { id ? "Update" : "Save"}
          </Button>}
          
      </Toolbar>         
      </AppBar>
       </main>
  )
}



export const ToggleFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -25,
  left: 0,
  right: 0,
  margin: '0 auto',
});



export function SearchArea({handleEdit}) {
  const [rows, setRows] = useState([])
  useEffect(() => {
    async function fetchAllData() {
      let response = await employeeService.getEmployee("api/v1/employee/basic/getEmployee/getAll", "");
      if(response.variant === "success"){
        // console.log(response.data)
        setRows(response.data)
      }else console.log(response)
    }
    fetchAllData()
  }, [])
  
const columns = [
    {
      field: 'userImage',
      headerName: '',
      width: 60,
      renderCell: props=> <Avatar alt={props?.row?.firstName} src={props?.row?.userImage} /> ,
      },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 120,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 120,
  },
  {
    field: 'jobRole',
    headerName: 'Designation',
    width: 120,
  },
  
  {
    field: 'mobile',
    headerName: 'Phone No.',
    description: 'Contact Number of the Employee',
    width: 130,
  },
  {
    field: 'email',
    headerName: 'Email Id',
    width: 160,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 110,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 110,
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: false,
    width: 160,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 120,
    renderCell: props=> <Button onClick={()=>handleEdit(props?.row?._id)} variant="text">Edit</Button>,
  },
];

  return (
    <main>
      <Box sx={{background:"#fff", borderRadius:"10px", width: '100%' }}>
      <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>All Employee</Typography>
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




export default Employee;