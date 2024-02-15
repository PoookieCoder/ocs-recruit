import {useState} from 'react'
import axios from 'axios'
import md5 from 'md5'
import {Button, Card, Typography, TextField, InputAdornment, OutlinedInput, IconButton, InputLabel, FormControl, CircularProgress, Table, TableRow, TableBody, TableHead,TableCell, TableContainer} from '@mui/material'
import {Visibility, VisibilityOff, KeyboardBackspace} from '@mui/icons-material'
import { Navigate } from 'react-router-dom'

interface user{ userid: String,
    password_hash: String,
    role: String
    };
let users:user[]=[];

function Login(){
    const [step , setStep]=useState(1)

    function Input(){
        const [userid, setUserid] = useState("")
        const [password, setPassword] = useState("")
        const [showPassword, setShowPassword] = useState(false);
                

        const handleClickShowPassword = () => setShowPassword((show) => !show);
    
        function create_hash(pass: string){
            return md5(pass.trim());
        }
    
        return(
            <div style={{display: "flex", flex:"flex-wrap", justifyContent: "center", alignItems: "center"}}>
                <Card variant={"outlined"} style={{ backgroundColor:"#f5f0eb",width: 300, height : 365, padding:"50px 50px", borderRadius: "25px", marginTop: 80, border:"2px solid black", boxShadow:"3px 2px 5px 2px #FFFFFF"}}>
                    <Typography align='center' style={{fontSize:45}}>
                       <b>LOGIN</b> 
                    </Typography>
                    <br /><br />
                    <TextField size="medium" style={{width:"290px", marginLeft:"7px"}} variant="outlined" required color="secondary"
                        label="User Id"
                        onChange={(e)=>{
                            setUserid(e.target.value);
                        }}
                    />
                    <br /><br />
                    <FormControl sx={{ m: 1, width: '290px',}} variant="outlined">
                        <InputLabel color='secondary' >Password*</InputLabel> 
                        <OutlinedInput
                            color="secondary"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        ></OutlinedInput>
                    </FormControl>
                    <br /><br /><br/>
                    <div style={{display: "flex", justifyContent:"center"}}>
                        <div><Button variant='contained' size='large'
                                    onClick={async ()=>{
                                        if(userid == "" || password == ""){alert("Please fill the required details"); 
                                                                           return;}
                                        setStep(2);
                                        const hash = create_hash(password);
                                        const user_id=userid.trim();
                                        const response = await axios.post('http://localhost:3000/',
                                            {userid: user_id, password_hash: hash},
                                        ).catch((error)=>{
                                                            alert(error.response.data.message)
                                                            setStep(1);
                                                            Navigate({to:"/"})});
                                        users = response!.data.users;
                                        setStep(3);
                                    }}
                        >LOGIN</Button></div>
                    </div>
                </Card>
            </div>
        )
    }
    function Loader(){
        return(
            <Card variant={"outlined"} style={{ width: 300, height : 365, padding:"50px 50px", borderRadius: "25px", marginTop: 80, border:"2px solid black", boxShadow:"2px 3px 5px 2px #FFFFFF"}}>
                <div style={{position:"absolute", top:"50%", left:"50%"}}><CircularProgress color="secondary"/></div>
            </Card>
        )
    }
    function Data(){
        return(
            <div >
                <Card variant={"outlined"} style={{ width: 500, height : 325, padding:"50px 50px", borderRadius: "25px", marginTop: 80, border:"2px solid black", boxShadow:"2px 3px 5px 2px #FFFFFF"}}>
                <div style={{margin:"-40px 0px 10px -40px"}}><IconButton onClick={()=>{setStep(1);
                                               Navigate({to:"/"})}}><KeyboardBackspace /></IconButton></div>
                <Table sx={{ width: 500 }} >
                    <TableHead>
                    <TableRow style={{backgroundColor:"#5F6368", color:"white", paddingLeft:"0px"}}>
                        <TableCell sx={{width:"40px" , color:"white"}} align='center' >UserId</TableCell>
                        <TableCell sx={{width:"200px", color:"white"}} align='center'>#Password</TableCell>
                        <TableCell sx={{width:"50px", color:"white"}} align='center'>Role</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((row) => (
                        <TableRow key ={users.indexOf(row)} style={{backgroundColor:"#F5F5F5", paddingRight:"10px"}}>
                        <TableCell align='center' sx={{width:"80px"}}>{row.userid}</TableCell>
                        <TableCell sx={{width:"150px"}} align='center'>{row.password_hash}</TableCell>
                        <TableCell sx={{width:"50px"}} align='center'>{row.role}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Card>
            </div>
        )
    }
    

    return(
        <div style={{backgroundImage: 'url("/src/assets/back4.jpeg")', backgroundSize:"100% 100%", width:"100vw", height:"100vh"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {step == 1? <Input />: step==2? <Loader />: <Data />}
            </div>
        </div>
    )
}
export default Login;