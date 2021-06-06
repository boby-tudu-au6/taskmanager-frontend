import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { connect } from 'react-redux';
import { doLogin } from 'actions';

const useStyles  = makeStyles({
    root: {
        padding: 20,
        margin: 'auto',
        textAlign: 'center'
    },
    input: {
        marginBottom: 8
    },
    icon: {
        width: 100,
        height: 100,
        fontSize: 100,
    }
})

function Login({ doLogin, history }) {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const handleChange = e => setState({...state, [e.target.name]: e.target.value });
    const handleSubmit = () => doLogin({state, history});
    return (
        <Grid container justify="center">
            <div  style={{
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <Grid item md={8} sm={8} xs={10} style={{ margin: 'auto'}}>
                    <Paper className={classes.root} elavation={3}>
                        <AccountCircleOutlinedIcon className={classes.icon} />
                        <Typography style={{ marginBottom: 20 }} variant="h3">Login</Typography>
                        <TextField 
                            fullWidth 
                            value={state.email} 
                            size="small" 
                            variant="outlined" 
                            name="email" 
                            type="email"
                            className={classes.input}
                            onChange={handleChange} 
                            label="Enter email" />
                        <TextField 
                            fullWidth 
                            value={state.password} 
                            size="small" 
                            variant="outlined" 
                            name="password" 
                            type="password"
                            className={classes.input}
                            onChange={handleChange} 
                            label="Enter password" />
                        <Button onClick={handleSubmit} fullWidth color="secondary" variant="contained" size="medium">Login</Button>
                        <Link to="/register">
                            <Typography variant="subtitle1">Don't have an account? Click here</Typography>
                        </Link>
                    </Paper>
                </Grid>
            </div>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => ({ doLogin: data => dispatch(doLogin(data))});
export default connect(null, mapDispatchToProps)(Login);
