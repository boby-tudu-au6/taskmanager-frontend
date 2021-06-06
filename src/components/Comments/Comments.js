import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import { getInitials } from 'utils/helpers';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        marginBottom: 8,
    }
})

function Comments({ user, data }) {
    const classes = useStyles();
    return (
        <Grid container justify="flex-start" className={classes.root}>
            <Grid item md={3} sm={3} xs={3}>
            <Avatar aria-label="recipe" className={classes.avatar}>
                {getInitials(user.name)}
            </Avatar>
            </Grid>
            <Grid item md={9} sm={9} xs={9}>
                <Typography paragraph>
                {data}
            </Typography>
            </Grid>
        </Grid>
    )
}

export default Comments
