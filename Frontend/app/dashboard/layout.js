'use client';
import React,{useState, Suspense} from 'react'
import "./dashboardStyle.css";
import {styled,Box,CssBaseline,Toolbar,IconButton,useTheme,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Divider, SwipeableDrawer   } from '@mui/material/';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { FcMenu,FcLeft,FcHome,FcFilmReel,FcGallery,FcConferenceCall,FcComboChart,FcBusinessman } from "react-icons/fc";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Loading from '../Components/Loading/Loading';

const drawerWidth = 240;

const DrawerData = ({open}) => {
  const router = useRouter();
  const [dashList1, setDashList] = useState([{title:"Dashboard",active: true, link:"/dashboard",icon:<FcComboChart/>},{title:"Prospect",active: false, link:"/dashboard/prospect",icon:<FcConferenceCall/>},{title:"Residents", active: false,link:"/dashboard/residents",icon:<FcHome/>},{title:"Employee", active: false,link:"/dashboard/employee",icon:<FcBusinessman/>}]) 
 
  const handleLink = (v,n)=>{
    router.push(v.link)
    let newArr =  dashList1.map((obj, j)=> {
      if(n === j){
        return { ...obj, active:true}
      } else {
        return {...obj,active:false}
      }
    })
    setDashList(newArr)
  }
  return (
    <div>
    <List>
          {dashList1.map((v,n) => (
            <ListItem key={n} onClick={()=>handleLink(v,n)} disablePadding className={v?.active ? "activeLink" : ""}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    fontSize:24,
                    justifyContent: 'center',
                  }}
                >
                  {v.icon}
                </ListItemIcon>
                <ListItemText primary={v.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <FcFilmReel /> : <FcGallery />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
  </div>
  )
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

function DashboardLayout({children}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              display: { xs: 'none', sm: 'block' },
              ...(open && { display: 'none' }),
            }}
          >
            <FcMenu />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Mobile Drawer"
            onClick={()=>setMobileOpen(!mobileOpen)}
            edge="start"
            sx={{
              marginRight: 2,
              marginLeft:1,
              display: { xs: 'block', sm: 'none' },
            }}
          >
            <FcMenu />
          </IconButton>
          <Image priority width={140} height={60} src="https://res.cloudinary.com/oasismanors/image/upload/v1685029880/Logo_hmwkcj.svg" alt="Oasis Manor"/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}  sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
          }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}  sx={{
              ...(!open && { display: 'none' }),
            }}>
          <FcLeft />
          </IconButton>
        </DrawerHeader>
        <DrawerData open={open} />
        <Divider />
      </Drawer>
  
        <SwipeableDrawer open={mobileOpen} onOpen={()=>setMobileOpen(true)} onClose={()=>setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            zIndex:2200,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
        <DrawerData open={mobileOpen} />
        </SwipeableDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
      </Box>
    </Box>
  )
}


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }), 
    },
  }),
}));





const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));





export default DashboardLayout