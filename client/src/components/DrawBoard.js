import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

// create the element rectangle
const createElement = (id, x1, y1, x2, y2) => {
  const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);;
  return { id, x1, y1, x2, y2, roughElement };
}

// adjust the coordinates of element
const adjustElementCoordinates = element => {
  const { x1, y1, x2, y2 } = element;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  return { x1: minX, y1: minY, x2: maxX, y2: maxY };
};

const DrawBoard = () => {
  const [ elements, setElements ] = useState([]);
  const [action, setAction] = useState("none");
  const [tool] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);

  // set the canvas element
  useLayoutEffect(() => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const updateElement = (id, x1, y1, x2, y2) => {
    const updatedElement = createElement(id, x1, y1, x2, y2);
    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseDown = event => {
    if(localStorage.getItem('selectedImg')) {
      setElements([]);
      localStorage.removeItem('selectedImg');
    }
    const { clientX, clientY } = event;
    const id = elements.length;
    const element = createElement(id, clientX, clientY, clientX, clientY, tool);
    setElements(prevState => [...prevState, element]);
    setSelectedElement(element);
    setAction("drawing");
  };

  const handleMouseMove = event => {
    const { clientX, clientY } = event;
    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    }
  };

  const handleMouseUp = () => {
    const index = selectedElement.id;
    if (action === "drawing" && elements[index]) {
      const { id } = elements[index];
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2);
    }
    setAction("none");
    setSelectedElement(null);
  };

  return(
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      Canvas
    </canvas>
  );
};

export default DrawBoard;