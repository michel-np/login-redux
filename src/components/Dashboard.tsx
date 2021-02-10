import React, {useState, useEffect} from "react";
import {RootStateOrAny, useSelector, useDispatch} from "react-redux"
import {getWidgetsWithToken} from "../providers/widgetsProvider";
import {useHistory} from "react-router-dom";
import {Paper,Backdrop, CircularProgress, Button} from "@material-ui/core";
import {RemoveToken} from "../store/actions/UserActions";

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

const Dashboard = () => {
    const [widgets, setWidgets] = useState<Widgets>();
    const [loading, setLoading] = useState(false);
    const token = useSelector((state: RootStateOrAny) => state.user)
    const dispatch = useDispatch();

    const history = useHistory();

    console.log(widgets)
    useEffect(() => {
        const getWidgets = async () => {
            if(token.token.data.token){
                setLoading(true)
                await getWidgetsWithToken(token.token.data.token).then(res => {
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
    <nav style={{height:50, display:"flex", justifyContent:"space-between"}}>
        <span style={{padding:10}}>Dashboard</span>
        <Button onClick={handleLogout}>SAIR</Button>
        
    </nav>
    <div style={{height:"100vh", width:"100vw", display:"flex", justifyContent:"space-evenly", flexWrap:"wrap", backgroundColor:"#020b2e"}}>
    {widgets && widgets.data ? widgets.data.map((widget:Widget) => (
       <div >
            <Paper elevation={2} style={{width:"20vw", height:"30vh", margin:20, display:"flex", flexDirection:"column", alignItems:"center"}}>
                <span style={{marginTop:20}}>{widget.title}</span>
                <span style={{textAlign:"center", paddingTop:20}}> {widget.description}</span>
            </Paper>
       </div>
    )) : <></>}
    </div>
    <Backdrop style={{zIndex:9}} open={loading}>
        <CircularProgress/>
    </Backdrop>
    
    </>
}

export default Dashboard;