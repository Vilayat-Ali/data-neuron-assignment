import { Box } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';

type Props = {
    defaultWidth: number;
    defaultHeight: number;
    children: ReactNode;
}

const ResizableComponent: React.FC<Props> = ({
    defaultHeight,
    defaultWidth,
    children
}) => {
  const [width, setWidth] = useState<number>(defaultWidth);
  const [height, setHeight] = useState<number>(defaultHeight);

  const onResize = (event: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <Resizable
      width={width}
      height={height}
      onResize={onResize}
      draggableOpts={{ grid: [10, 10] }}
    >
        <Box width="100%" backgroundColor={"red"}>
        {children}
        </Box>
    </Resizable>
  );
};

export default ResizableComponent;
