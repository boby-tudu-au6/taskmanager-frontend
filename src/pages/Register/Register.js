import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { connect } from 'react-redux';
import { doRegister } from 'actions';

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

function Register({ doRegister, history }) {
    const classes = useStyles();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = e => setState({...state, [e.target.name]: e.target.value });
    const handleSubmit = () => doRegister({state, history});
    return (
        <Grid container justify="center">
            <div  style={{
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Grid item md={6} sm={6} xs={10} style={{ margin: 'auto'}}>
                <Paper className={classes.root} elavation={3}>
                    <PersonAddOutlinedIcon className={classes.icon} /><br />
                    <Typography style={{ marginBottom: 20 }} variant="h3">Register</Typography>
                    <TextField 
                        fullWidth 
                        value={state.name} 
                        size="small" 
                        variant="outlined" 
                        name="name" 
                        type="text"
                        className={classes.input}
                        onChange={handleChange} 
                        label="Enter name" />
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
                    <Button fullWidth onClick={handleSubmit} color="secondary" variant="contained" size="medium">Register</Button>
                    <Link to="/login">
                        <Typography variant="subtitle1">Already have an account? Click here</Typography>
                    </Link>
                </Paper>
            </Grid>
        </div>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => ({ doRegister: data => dispatch(doRegister(data))});
export default connect(null, mapDispatchToProps)(Register)
