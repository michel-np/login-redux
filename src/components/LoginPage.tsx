import React, {useState, useEffect} from "react";
import {TextField, Button, Backdrop, CircularProgress} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import {GetUserToken} from "../store/actions/UserActions";


import {useSelector, useDispatch, RootStateOrAny} from "react-redux";


const useStyles = makeStyles(() => ({
    container:{
        display:"flex",                        
        justifyContent:"center",
        alignItems:"center",
        height:"100vh", 
        "& form":{
            width:"30vw",
            height:"20vw",
            border:".1px solid",
            borderRadius:5,
            padding:30,
            display:"flex",
            flexDirection:"column",
            "& .MuiTextField-root":{
                padding:10
            }
            
        }
    },
    backdrop:{
        zIndex:9,
        color:"blue"
    }
    
}))

interface UserFormData {
    account:string;
    username:string;
    password:string;
}


const LoginPage= () => {
    const [loginData, setLoginData] = useState<UserFormData>({
        account:"",
        username:"",
        password:"",
    })
    const classes = useStyles();
    const tokenResponse = useSelector((state : RootStateOrAny) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    
    useEffect(()=>{
        if(tokenResponse.token && tokenResponse.token.success === true) {
            history.push("/dashboard")
        }
    },[tokenResponse])

    

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {

        setLoginData({
            ...loginData,
            username:e.currentTarget.value
        })
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            password:e.currentTarget.value
        })
    }

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        
        const accountNumber = e.currentTarget.value;
        const getOnlyNumbersRegex = /^[0-9\b./-]+$/
        if(getOnlyNumbersRegex.test(accountNumber) || accountNumber.length === 0){
            setLoginData({
                ...loginData,
                account:e.currentTarget.value
            })
        }
        
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {      
        e.preventDefault();
        await dispatch(GetUserToken({
            account:parseInt(loginData.account),
            username:loginData.username,
            password:loginData.password,
            force:1
        }));

    }
        
    
    return (<>            
        <div className={classes.container}>
           <form onSubmit={handleSubmit} >
            <div style={{padding:15, textAlign:"center"}}>
            {
                tokenResponse.error && tokenResponse.error.data.code === 401 ? 
                <span >Algo deu errado. Verifique as credenciais.</span>
                : null
            }
            </div>
            <TextField label="Conta" value={loginData.account} onChange={handleAccountChange} required/>
            <TextField label="Login" onChange={handleUsernameChange} required/>
            <TextField label="Senha"  type="password" onChange={handlePasswordChange} required/>    
            <Button type="submit">ENTRAR</Button>
        </form>
            
        </div>
        <Backdrop className={classes.backdrop} open={tokenResponse.loading === true}>
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    );

}

export default LoginPage;