import React, {useState, useEffect, FunctionComponent } from "react";
import {RootStateOrAny, useSelector, useDispatch} from "react-redux"
import { getWidgetsInCurrentPage } from "../providers/widgetsProvider";
import {useHistory} from "react-router-dom";
import {Paper,Backdrop, CircularProgress, Button} from "@material-ui/core";
import {RemoveToken} from "../store/actions/UserActions";
import {makeStyles} from "@material-ui/styles";
import {Pagination} from "@material-ui/lab"

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

interface Pagination {
    count:number;
    current_page:number;
    has_next_page:boolean;
    has_prev_page:boolean;
    page_count:number;  
    limit:number | null;
}

interface WidgetContainerProps {
    page:number; //haha
    widgets:Widget[],
    pagination:Pagination | undefined

}   
interface Props{

}

const useStyles = makeStyles(() => ({
    
    navbar: {
        height:50,
        width:"90vw",
        display:"flex",
        justifyContent:"space-between",
        "& span":{
            padding:15,
        }        
    },
    widgetsContainer:{
        height:"100vh",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        flexWrap:"wrap",
        backgroundColor:"#020b2e",
        "& .MuiPaper-root":{
            width:"20%",
            height:"20vh",
            margin:20,
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        }
    }
}))

const Dashboard : FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const tokenState = useSelector((state: RootStateOrAny) => state.user)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const [currentPageWidgets, setCurrentPageWidgets] = useState<Widget[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<Pagination>()

    const history = useHistory();
    
    useEffect(() => {
        const getWidgets = async () => {
            if(tokenState.token && tokenState.token.data.token){
                setLoading(true)
                await getWidgetsInCurrentPage(page,tokenState.token.data.token).then(res => {
                    console.log(res.data)
                    setCurrentPageWidgets(res.data.data);
                    setPaginationInfo(res.data.pagination);
                })
                setLoading(false)
            }else{
                history.push("/")
            }   
        }
        getWidgets();
    },[])

    const WidgetsContainer : FunctionComponent <WidgetContainerProps>= ({page, widgets, pagination}) => {
         
        const onChangePage = (event : React.ChangeEvent<unknown>, newPage:number) => {
            setPage(newPage)
        }
        

        return(
            <>
                {widgets ? widgets.map((widget:Widget) => (        
                <Paper elevation={2}>
                    <span style={{marginTop:20}}>{widget.title}</span>
                    <span style={{textAlign:"center", paddingTop:20}}> {widget.description}</span>
                </Paper>
                ))
                : setLoading(true)}                
                <Pagination color="secondary" style={{color:"white",width:"100%", display:"flex", justifyContent:"center"}}
                    count={pagination?.page_count}
                    hidePrevButton={!pagination?.has_prev_page}
                    hideNextButton={!pagination?.has_next_page}
                    showFirstButton={pagination?.has_prev_page}
                    showLastButton={pagination?.has_next_page}
                    page={page}
                    onChange={onChangePage}                    
                />
                

            </>
        )
    }

    const handleLogout = async () : Promise<void> => {
        await dispatch(RemoveToken());
        history.push("/")
    }


    return<>
        <nav className={classes.navbar}>
            <span>Widgets</span>
            <Button  size="small" style={{position:"absolute", right:10}} onClick={handleLogout}>SAIR</Button>
            
        </nav>
        <div className={classes.widgetsContainer}>
            <WidgetsContainer page={page} widgets={currentPageWidgets} pagination={paginationInfo} />
        </div>
        
        <Backdrop style={{zIndex:9}} open={loading}>
            <CircularProgress/>
        </Backdrop>
    
    </>
}

export default Dashboard;