import React, { useState, useEffect, } from 'react'
import { useLocation } from 'react-router-dom';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  lbl1: {
    height: "50px",
    width: "130px",
    backgroundColor: "orange",
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      cursor: "pointer",
    },
  },
  lbl2: {
    height: "50px",
    width: "130px",
    backgroundColor: "green",
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      cursor: "pointer",
    },
  },
  canvascontainerrect: {
    height: 500,
    width: 500,
    border: "2px solid #000",
    marginLeft: "100px",
    marginTop: "100px",
  }
}));





const Pages = () => {

  const location = useLocation();

  const classes = useStyles();

  const { var1 } = location.state;

  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const [isDown, setisDown] = useState(0);
  const [shouldDisplay, setShouldDisplay] = useState(0);
  const [initialPos, setInitialPos] = useState({ xpos: 0, ypos: 0 });
  const [finalPos, setFinalPos] = useState({ xpos: 0, ypos: 0 });
  const [defineHeight, setDefineHeight] = useState(initialPos.ypos);
  const [defineWidth, setDefineWidth] = useState(initialPos.xpos);
  const [label1, setlebel1] = useState(0);
  const [labeldisele, setLabeldisele] = useState([[]]);

  const handleClick1 = () => {
    setCnt1((cnt1 + 1) % 2);
    setCnt2(0);
    setlebel1(1);
  }
  const handleClick2 = () => {
    setCnt2((cnt2 + 1) % 2);
    setCnt1(0);
    setlebel1(0);
  }

  const handleMouseDown1 = (e) => {
    // console.log(e);
    setisDown(1);
    setShouldDisplay(1);
    // console.log(shouldDisplay)
    const updated_val = { xpos: e.clientX, ypos: e.clientY };
    setInitialPos((initialPos) => ({
      ...initialPos,
      ...updated_val
    }));



  }
  const handleMouseUp1 = (e) => {
    // console.log(e);
    setisDown(0);
    // console.log("lol2");
    let storearr = [initialPos.xpos - 442, initialPos.ypos, defineHeight, defineWidth]
    if (label1 === 1) {
      storearr.push(1);
      let x = Math.random() * 100;
      localStorage.setItem(x, JSON.stringify(storearr));
    }
    else {
      storearr.push(0);
      let x = Math.random() * 100;
      localStorage.setItem(x, JSON.stringify(storearr));
    }

    var values = [[]],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    setLabeldisele(values);
    console.log(labeldisele);

  }
  const handleMouseOver1 = (e) => {
    // console.log(e.clientX,e.clientY);
    if (isDown !== 0) {
      console.log("lol");
      finalPos.xpos = e.clientX;
      finalPos.ypos = e.clientY;
      setDefineHeight(finalPos.ypos - initialPos.ypos);
      setDefineWidth(finalPos.xpos - initialPos.xpos);
    }

    // console.log(initialPos.xpos);
    // console.log(defineHeight,defineWidth);
  }

  //drawing box

  const fun1 = () => {
    var values = [[]],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    setLabeldisele(values);
  }

  let effren = 0;

  useEffect(() => {
    if (effren === 0) {
      fun1()
    }
    effren = 1;


  }, [])





  return (
    <>
      <div style={{ border: "5px solid green", width: "29%", height: "720px", position: "absolute", display: "flex", flexWrap: "wrap" }}>

        <div style={{ border: "5px solid red", width: "100%", height: "30%", }}>
          <h2>Labels</h2>
          <div style={{ display: "flex" }}>
            <div className={classes.lbl1} onClick={handleClick1} style={{ border: ((cnt1 === 1) ? "4px solid black" : "") }}><h3>TITLE</h3></div>
            <div className={classes.lbl2} onClick={handleClick2} style={{ border: ((cnt2 === 1) ? "4px solid black" : "") }}><h3>AUTHOR</h3></div>
          </div>
        </div>

        <div style={{
          display: ((shouldDisplay === 0) ? "none" : "block"),
          position: "absolute",
          left: initialPos.xpos,
          top: initialPos.ypos,
          backgroundColor: "orange",
          height: defineHeight,
          width: defineWidth,
          opacity: 0.5,
          zIndex: 2,

        }}

          onMouseUp={handleMouseUp1}

        >

        </div>


        <div style={{ border: "5px solid red", width: "100%", height: "68%" }}>
          <h2>BOXES</h2>


          <div style={{ border: "5px solid pink", height: "400px", width: "427px", overflow: "hidden", overflowY: "scroll" }}>
            {
              labeldisele.map((item, index) => {
                return (
                  <div key={index} style={{}} >
                    <span style={{ display: (item[0] === undefined) ? "none" : "flex", justifyContent: "center", alignItems: "center" }}>
                      x : {item[0]} y: {item[1]} height : {item[2]} width: {item[3]}
                      {(item[4] === 0) ?
                        <span className={classes.lbl2} style={{}}><h3>AUTHOR</h3></span>
                        :
                        <span className={classes.lbl1} style={{}}><h3>TITLE</h3></span>}

                      
                    </span>

                  </div>
                )
              })
            }
          </div>




        </div>
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js" >

        <div style={{ width: "70%", height: "720px", border: "5px solid black", float: "right" }}
          onMouseDown={handleMouseDown1}
          onMouseMove={(isDown) ? handleMouseOver1 : () => { }}
        >

          <Viewer fileUrl={var1} />
        </div>

      </Worker>
    </>
  )
}

export default Pages