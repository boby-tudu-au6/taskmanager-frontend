import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined'
import {ErrorOutline} from '@material-ui/icons'

const useStyles = makeStyles({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    success: { background: 'green', display: 'flex' },
    danger: { background: 'red', display: 'flex' },
})

const SuccessSnackbar = (props) => {
    const { open, onClose, type, text } = props
    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            autoHideDuration={3000}
            onClose={onClose}
            open={open}>
            <SnackbarContent
                className={type==='ok'?classes.success:classes.danger}
                message={
                    <span style={{ display: 'flex' }}>
                        {
                            type==='ok'?
                            <CheckCircleIcon className='mr-3' />:
                            <ErrorOutline className='mr-3' />
                        }
                        {text}
                    </span>
                }
                variant="elevation"
            />
        </Snackbar>
    )
}


export default SuccessSnackbar
