import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import {
  motionComponents,
  looksComponents,
} from "./SidebarConstants";

export default function Sidebar() {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-80 h-full overflow-y-auto flex flex-row items-start p-2 border-r border-gray-200">
      {/* Headings with Icons */}
      <div className="mb-4 pr-4 border-r border-gray-300 flex-shrink-0">
        <button
          onClick={() => scrollToSection("motion-section")}
          className="flex items-center font-bold text-lg mb-2 text-blue-500 hover:text-blue-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm0 3.6a.8.8 0 0 0-.8.8v4a.8.8 0 1 0 1.6 0v-4a.8.8 0 0 0-.8-.8z" />
          </svg>
          Motion
        </button>

        <button
          onClick={() => scrollToSection("looks-section")}
          className="flex items-center font-bold text-lg mb-2 text-purple-500 hover:text-purple-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm0 3.6a.8.8 0 0 0-.8.8v4a.8.8 0 1 0 1.6 0v-4a.8.8 0 0 0-.8-.8z" />
          </svg>
          Looks
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow pl-4">
        {/* Motion */}
        <div id="motion-section" className="font-bold heading">
          {"Motion"}
        </div>
        <Droppable droppableId="sideArea-motion" type="COMPONENTS">
          {(provided) => (
            <ul
              className="sideArea-motion my-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {motionComponents.map((x, i) => {
                return (
                  <Draggable
                    key={`${x}-sideArea`}
                    draggableId={`${x}-sideArea`}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="my-2"
                      >
                        {getComponent(x)}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        {/* Looks */}
        <div id="looks-section" className="font-bold heading">
          {"Looks"}
        </div>
        <Droppable droppableId="sideArea-looks" type="COMPONENTS">
          {(provided) => (
            <ul
              className="sideArea-looks my-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {looksComponents.map((x, i) => {
                return (
                  <Draggable
                    key={`${x}-sideArea`}
                    draggableId={`${x}-sideArea`}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="my-2"
                      >
                        {getComponent(x)}
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
    </div>
  );
}
