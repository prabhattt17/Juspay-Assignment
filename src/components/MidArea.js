import React, { useState } from "react";
import { connect } from "react-redux";
import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { purple } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

// Styling for MaterialUI Components
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 0,
    },
    activeComponent: {
      boxShadow: "0 0 15px 5px rgba(0, 0, 255, 0.7)", // Box shadow for active component
    },
  })
);

// Customized button for Running Lists
const RunButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

// Mid Area Component
function MidArea({ area_list, add_list, event_values }) {
  const classes = useStyles();
  const [activeComponentId, setActiveComponentId] = useState(null);

  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      const evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;
    let repeat = 1;

    const str1 = `comp${arr[i]}-${id}-${i}`;

    if (arr[i] === "WAIT") {
      const str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    } else if (arr[i] !== "REPEAT") {
      setActiveComponentId(str1); // Set active component
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    const cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
        setActiveComponentId(null); // Reset active component when done
      }

      if (arr[i] === "WAIT") {
        const str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      } else if (arr[i] === "REPEAT") {
        const str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      } else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        const str2 = `comp${arr[i]}-${id}-${i}`;
        setActiveComponentId(str2); // Set active component
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        const str2 = `comp${arr[i]}-${id}-${i}`;
        setActiveComponentId(str2); // Set active component
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };

  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Drag Actions here to create a List
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => add_list()}
          >
            Add List
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-col">
        {area_list.midAreaLists.map((l) => {
          return (
            <div className="w-60" key={l.id}>
              <Paper elevation={3} className="p-4">
                <div className="w-52 border border-2 border-gray-300 p-2">
                  <Droppable droppableId={l.id} type="COMPONENTS">
                    {(provided) => (
                      <ul
                        className={`${l.id} w-48 h-full`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div className="text-center mx-auto my-2 mb-4">
                          <RunButton
                            variant="contained"
                            className={classes.button}
                            startIcon={<PlayArrowIcon />}
                            onClick={() => handleClick(l.comps, l.id)}
                          >
                            Run
                          </RunButton>
                        </div>

                        {l.comps &&
                          l.comps.map((x, i) => {
                            const str = `${x}`;
                            const component_id = `comp${str}-${l.id}-${i}`;
                            const isActive = activeComponentId === component_id;

                            return (
                              <Draggable
                                key={`${str}-${l.id}-${i}`}
                                draggableId={`${str}-${l.id}-${i}`}
                                index={i}
                              >
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={isActive ? classes.activeComponent : ""}
                                  >
                                    {getComponent(str, component_id)}
                                    {provided.placeholder}
                                  </li>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
    event_values: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
