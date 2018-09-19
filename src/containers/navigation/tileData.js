import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Dashboard from '@material-ui/icons/Dashboard'
import DataUsage from '@material-ui/icons/DataUsage'
import WebAsset from '@material-ui/icons/WebAsset'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'
import NetworkCell from '@material-ui/icons/NetworkCell'
import Album from '@material-ui/icons/Album'
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom'

export const mailFolderListItems = (
    <div>
        <Link to="/">
            <ListItem button>
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link to="/containers">
            <ListItem button>
                <ListItemIcon>
                    <WebAsset />
                </ListItemIcon>
                <ListItemText primary="Containers" />
            </ListItem>
        </Link>
        <Link to="/images">
            <ListItem button>
                <ListItemIcon>
                    <Album />
                </ListItemIcon>
                <ListItemText primary="Images" />
            </ListItem>
        </Link>
        <Link to="/usage">
            <ListItem button>
                <ListItemIcon>
                    <DataUsage />
                </ListItemIcon>
                <ListItemText primary="Usage" />
            </ListItem>
        </Link>
        <Link to="/networks">
            <ListItem button>
                <ListItemIcon>
                    <NetworkCell />
                </ListItemIcon>
                <ListItemText primary="Networks" />
            </ListItem>
        </Link>
    </div>
)
