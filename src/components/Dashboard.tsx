import React, {useState, useEffect} from "react";
import {RootStateOrAny, useSelector, useDispatch} from "react-redux"
import {getWidgetsWithToken} from "../providers/widgetsProvider";
import {useHistory} from "react-router-dom";
import {Paper,Backdrop, CircularProgress, Button} from "@material-ui/core";
import {RemoveToken} from "../store/actions/UserActions";
import {makeStyles} from "@material-ui/styles";

interface Widget {
    id:number;
    type_id:number;
    title:string;
    description:string;
    created_at:string;
    modified_at:string;
    active:number;
    analytic:number
}

interface Widgets {
    success:boolean;
    data?:Widget[];
    pagination?:{
        count:number;
        current_page:number;
        has_next_page:boolean;
        has_prev_page:boolean;
        page_count:number;        
    }
}

const useStyles = makeStyles(() => ({
    navbar: {
        height:50,
        display:"flex",
        justifyContent:"space-between",
        "& span":{
            padding:10
        }
    },
    widgetsContainer:{
        height:"100vh",
        width:"100vw",
        display:"flex",
        justifyContent:"space-evenly",
        flexWrap:"wrap",
        backgroundColor:"#020b2e",
        "& .MuiPaper-root":{
            width:"20vw",
            height:"40vh",
            margin:20,
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }
    }
}))

const Dashboard = () => {
    const classes = useStyles();
    const [widgets, setWidgets] = useState<Widgets>();
    const [loading, setLoading] = useState(false);
    const tokenState = useSelector((state: RootStateOrAny) => state.user)
    const dispatch = useDispatch();

    const history = useHistory();

    console.log("Widgets",tokenState)
    useEffect(() => {
        const getWidgets = async () => {
            if(tokenState.token && tokenState.token.data.token){
                setLoading(true)
                await getWidgetsWithToken(tokenState.token.data.token).then(res => {
                    setWidgets(res.data)
                })
                setLoading(false)
            }else{
                history.push("/")
            }   
        }
        getWidgets();
    },[])

    const handleLogout = async () : Promise<void> => {
        await dispatch(RemoveToken());
        history.push("/")
    }


    return<>
    <nav className={classes.navbar}>
        <span style={{padding:10}}>Dashboard</span>
        <Button onClick={handleLogout}>SAIR</Button>
        
    </nav>
    <div className={classes.widgetsContainer}>
        {widgets && widgets.data ? widgets.data.map((widget:Widget) => (        
            <Paper elevation={2}>
                <span style={{marginTop:20}}>{widget.title}</span>
                <span style={{textAlign:"center", paddingTop:20}}> {widget.description}</span>
            </Paper>        
        )) : <></>}
    </div>
    <Backdrop style={{zIndex:9}} open={loading}>
        <CircularProgress/>
    </Backdrop>
    
    </>
}

export default Dashboard;