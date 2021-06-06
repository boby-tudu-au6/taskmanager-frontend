import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TaskCard } from 'components';
import { loadUsers, createTask, loadTasks,
    deleteTask, createComment, loadComments, editTask } from 'actions';
import { connect } from 'react-redux';
import TaskForm from './components/Dialog';

const useStyles = makeStyles({
    root: {
        paddingTop: 20
    },
    box: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'center',
        marginBottom: 8,
        borderRadius: 4,
        background: '#3F51B5',
        color: 'white'
    },
    create_button: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: 'center',
        marginBottom: 8,
        borderRadius: 4,
        background: '#4CAF50',
        color: 'white'
    }
})

function Home(props) {
    const {
        loadUsers, users, createTask, task,
        loadTasks, deleteTask, auth
    } = props;
    const classes = useStyles();
    const [showDialog, setDialog] = useState(false);
    const closeDialog = () => setDialog(false);
    const openDialog = () => setDialog(true);
    const createTaskData = (data) => {
        closeDialog();
        const TOKEN = localStorage.getItem('TOKEN');
        const { user } = JSON.parse(TOKEN)
        const formdata = new FormData();
        formdata.append("data", data.data);
        formdata.append("type", data.type);
        formdata.append("user", user._id);
        formdata.append('assignedUser', data.user)
        createTask(formdata)
            .then(() => loadTasks(auth.user._id))
    }
    const deleteTaskData = async (data) => {
        await deleteTask(data);
        await loadTasks(auth.user._id);
    }
    
    useEffect(()=>{
        if(!users.data) loadUsers();
        if (auth.user && !task.data ) loadTasks(auth.user._id)
    },[users, loadUsers, task.data, loadTasks, auth.user]);

    return (
        <Container maxWidth="lg">
            <TaskForm 
                users={ users.data ? users.data: []} 
                open={showDialog} 
                onClose={closeDialog} 
                createTask={createTaskData} />
            <Grid container justify="center" spacing={3} style={{ paddingTop: 12 }}>
                <Grid item md={3}>
                    <div className={classes.box}>
                        <Typography variant="h6">
                            My Tasks
                        </Typography>
                        <Typography variant="subtitle2">
                            Tasks created by logged user
                        </Typography>
                    </div>
                    <Button onClick={openDialog} fullWidth className={classes.create_button} variant="contained">Create</Button>
                    {task.myTask && task.myTask.map((i) =><TaskCard deleteTask={deleteTaskData} key={i._id} {...i} {...props} />)}
                </Grid> 
                <Grid item md={3}>
                    <div className={classes.box}>
                        <Typography variant="h6">
                            My History
                        </Typography>
                        <Typography variant="subtitle2">
                            History of logged user
                        </Typography>
                    </div>
                    {task.myHistory && task.myHistory.map((item, i) =>(<TaskCard key={i} {...item} />))}
                </Grid> 
                <Grid item md={3}>
                    <div className={classes.box}>
                        <Typography variant="h6">
                            Other Tasks
                        </Typography>
                        <Typography variant="subtitle2">
                            Tasks created by other users
                        </Typography>
                    </div>
                    {task.otherTask && task.otherTask.map((i) =><TaskCard deleteTask={deleteTaskData} key={i._id} {...i} {...props} />)}
                </Grid> 
                <Grid item md={3}>
                    <div className={classes.box}>
                        <Typography variant="h6">
                            Other History
                        </Typography>
                        <Typography variant="subtitle2">
                            History of other users
                        </Typography>
                    </div>
                    {task.otherHistory && task.otherHistory.map((item, i) =>(<TaskCard key={i} {...item} />))}
                </Grid> 
            </Grid>
        </Container>
    )
}

const mapStateToProps = state => ({ users: state.users, task: state.task, auth: state.auth });
const mapDispatchToProps = dispatch => ({
    loadUsers: () => dispatch(loadUsers()),
    editTask: data => dispatch(editTask(data)),
    loadTasks: data => dispatch(loadTasks(data)),
    createTask: data => dispatch(createTask(data)),
    deleteTask: data => dispatch(deleteTask(data)),
    loadComments: data => dispatch(loadComments(data)),
    createComment: data => dispatch(createComment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
