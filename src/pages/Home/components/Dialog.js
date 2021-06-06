import React, { useState } from 'react';
import { CustomeSelect } from 'components';
import { makeStyles } from '@material-ui/styles';
import { task_types as options } from 'utils/constants';
import { Card, CardHeader, Divider, CardContent, Dialog, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        borderRadius: 8,
        width: '100%',
    },
    input: {
        marginBottom: 8
    }
})

function TaskForm(props) {
    const { open, onClose, createTask, users } = props;
    const classes = useStyles();
    const [state, setState] = useState({
        type: 'Text',
        data: '',
        user: ''
    });
    
    const handleChange = e => {
        const name = e.target.name;
        if (name==='type') return setState({...state, [name]: e.target.value, data: '' })
        setState({ ...state, [name]: e.target.value })
    };
    const handleFile = e => {
        const data = e.target.files[0];
        setState({...state, data });
    }
    const handleSubmit = () => {
        createTask(state);
        setState({ type: 'Text', data: '', user: '' });
    }

    return (
        <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
            <Card className={classes.root}>
                <CardHeader title="Create new task" />
                <Divider />
                <CardContent>
                    <CustomeSelect label="Task type" 
                        value={state.type} 
                        name="type"
                        onChange={handleChange}
                        options={options}
                        className={classes.input}
                    />
                    {
                        state.type === "Text" ?
                        (
                            <TextField name="data" 
                            className={classes.input} 
                            fullWidth 
                            value={state.data}
                            variant="outlined" 
                            size="small" type="text" 
                            label="Enter Task" 
                            onChange={handleChange} />
                        ): (
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                className={classes.input}
                            >
                                {state.data 
                                ? state.data.name
                                : "Select File"}
                                <input
                                type="file"
                                name="data"
                                accept={state.type === "Video" ? "video/*": "image/*"}
                                onChange={handleFile}
                                hidden
                                />
                            </Button>
                        )
                    }
                    <CustomeSelect label="Assign user" 
                        value={state.user} 
                        name="user"
                        onChange={handleChange}
                        options={users}
                        className={classes.input}
                    />
                    <Button onClick={handleSubmit}
                    variant="contained" color="secondary" size="medium" fullWidth>Create</Button>
                </CardContent>
            </Card>
        </Dialog>
    )
}

export default TaskForm
