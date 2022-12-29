import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
  } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    container: {

    }
}));





const Documents = () => {



    const classes = useStyles();


    const docList1 = {
        "doc1": "https://arxiv.org/pdf/2212.08011.pdf",
        "doc2": "https://arxiv.org/pdf/2212.07937.pdf",
        "doc3": "https://arxiv.org/pdf/2212.07931.pdf",
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.heading}>
                    <h3>Documents</h3>
                </div>

                <div className={classes.item}>
    
                    <div><Link to={"/Pages/doc1"} state={{var1:docList1.doc1}}> Document 1</Link></div>
                    <div><Link to={"/Pages/doc2"} state={{var1:docList1.doc2}}> Document 2</Link></div>
                    <div><Link to={"/Pages/doc3"} state={{var1:docList1.doc3}}> Document 3</Link></div>
                </div>
            </div>

        </>
    )
}

export default Documents