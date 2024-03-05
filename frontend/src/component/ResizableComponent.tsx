import { ReactNode, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const ResizableComponent = ({ children }: { children: ReactNode }) => {
  const resizableElement = useRef<HTMLDivElement>(null);
  const initialDimensions = useRef<{ width: number | null; height: number | null }>({ width: null, height: null });

  const onMouseDownRight = () => {
    if (!resizableElement.current) return;

    initialDimensions.current.width = resizableElement.current.offsetWidth;
    const resizableRect = resizableElement.current.getBoundingClientRect();

    const onMouseMove = (event: MouseEvent) => {
      if (!initialDimensions.current.width || !resizableElement.current) return;

      const newWidth = initialDimensions.current.width + event.clientX - resizableRect.right;
      resizableElement.current.style.width = `${newWidth}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseDownBottom = () => {
    if (!resizableElement.current) return;

    initialDimensions.current.height = resizableElement.current.offsetHeight;
    const resizableRect = resizableElement.current.getBoundingClientRect();

    const onMouseMove = (event: MouseEvent) => {
      if (!initialDimensions.current.height || !resizableElement.current) return;

      const newHeight = initialDimensions.current.height + event.clientY - resizableRect.bottom;
      resizableElement.current.style.height = `${newHeight}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseDownLeft = () => {
    if (!resizableElement.current) return;

    initialDimensions.current.width = resizableElement.current.offsetWidth;
    const resizableRect = resizableElement.current.getBoundingClientRect();

    const onMouseMove = (event: MouseEvent) => {
      if (!initialDimensions.current.width || !resizableElement.current) return;

      const newWidth = initialDimensions.current.width + resizableRect.right - event.clientX;
      resizableElement.current.style.width = `${newWidth}px`;
      resizableElement.current.style.left = `${resizableRect.left + event.clientX - resizableRect.right}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Box
      ref={resizableElement}
      position="relative"
      p={2}
      width='100%'
      border='1px solid black'
    >
      {children}
      <Box
        className="resizer right"
        position="absolute"
        width="10px"
        height="100%"
        top="0"
        right="0"
        cursor="col-resize"
        onMouseDown={onMouseDownRight}
      />
      <Box
        className="resizer bottom"
        position="absolute"
        width="100%"
        height="10px"
        left="0"
        bottom="0"
        cursor="row-resize"
        onMouseDown={onMouseDownBottom}
      />
      <Box
        className="resizer left"
        position="absolute"
        width="10px"
        height="100%"
        top="0"
        left="0"
        cursor="col-resize"
        onMouseDown={onMouseDownLeft}
      />
      <Box
        className="resizer top"
        position="absolute"
        width="100%"
        height="10px"
        top="0"
        left="0"
        cursor="row-resize"
      />
    </Box>
  );
};

export default ResizableComponent;
