import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { drawSocket } from '../../api/socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTrash } from '@fortawesome/free-solid-svg-icons';

const Drawing = () => {
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(4);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [roomId, setRoomId] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const newRoomId = pathParts[2].startsWith(':')
      ? pathParts[2].substring(1)
      : pathParts[2];
    setRoomId(newRoomId);
    console.log(roomId);

    const canvas = canvasRef.current;
    if (canvas && !contextRef.current) {
      canvas.width = 940;
      canvas.height = 563;
      canvas.style.width = '940px';
      canvas.style.height = '563px';
      canvas.style.backgroundColor = 'white';

      const ctx = canvas.getContext('2d');
      ctx!.scale(1, 1);
      ctx!.lineCap = 'round';
      ctx!.lineWidth = lineWidth;
      contextRef.current = ctx;
    }

    // 색상 변경
    const ctx = contextRef.current;
    if (ctx) {
      ctx.strokeStyle = color;
    }

    // 굵기 변경
    if (canvas && ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  /// 색상 변경 함수
  const changeColor = (newColor: string) => {
    setColor(newColor);
  };

  /// 전체 지우개 함수
  const EraseAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    ctx!.fillStyle = 'white';
    ctx!.fillRect(0, 0, 940, 563);

    drawSocket.emit('erase', { option: { roomId } });
  };

  /// 마우스 이동 감지 + 그리는 역할
  const getDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!canvasRef.current) {
      return;
    }

    const canvasCurrent: HTMLCanvasElement = canvasRef.current;
    const rect = canvasCurrent.getBoundingClientRect();

    const scaleX = canvasCurrent.width / rect.width;
    const scaleY = canvasCurrent.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  /// mousedown 했을 때 좌표 저장 + 페인팅 시작 상태값 변경
  const startPaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const paint = getDrawing(event);

    if (paint) {
      setIsPainting(true);
      setMousePosition(paint);
    }
  };

  /// 그리기 (현재 좌표 -> 움직인 좌표로 이동)
  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPainting) {
      const newMousePosition = getDrawing(event);
      if (mousePosition && newMousePosition) {
        draw(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  };

  /// 그리기 끝내기 (mouseUp, exit)
  const exitPaint = () => {
    setIsPainting(false);
  };

  /// 그리는 함수 (canvasAPI 메서드)
  const draw = (
    originalMousePosition: { x: number; y: number },
    newMousePosition: { x: number; y: number },
  ) => {
    const ctx = contextRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();

      drawSocket.emit('drawing', {
        originalMousePosition,
        newMousePosition,
        option: {
          color,
          lineWidth,
          roomId,
        },
      });
    }
  };

  const getRangeInputStyle = () => {
    const gradient_value = 100 / 10;
    const backgroundSize = gradient_value * lineWidth;
    return {
      background: `linear-gradient(to right, #FFE283 0%, #FFE283 ${backgroundSize}%, rgb(236, 236, 236) ${backgroundSize}%, rgb(236, 236, 236) 100%)`,
    };
  };

  useEffect(() => {
    if (roomId) {
      drawSocket.connect();
      drawSocket.emit('joinRoom', roomId);

      const onDrawingEvent = ({
        originalMousePosition,
        newMousePosition,
        option,
      }: IReciveInfo) => {
        const ctx = contextRef.current;
        if (!ctx) {
          console.error('Canvas context is not available.');
          return;
        }

        try {
          ctx.strokeStyle = option.color;
          ctx.lineWidth = option.lineWidth;
          ctx.beginPath();
          ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
          ctx.lineTo(newMousePosition.x, newMousePosition.y);
          ctx.closePath();
          ctx.stroke();
        } catch (error) {
          console.error('Error while drawing on canvas:', error);
        }
      };

      const onEraseEvent = () => {
        const ctx = contextRef.current;
        if (!ctx) return;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 940, 563);
      };

      drawSocket.on('drawing', onDrawingEvent);
      drawSocket.on('erase', onEraseEvent);

      return () => {
        // 컴포넌트 언마운트 시 소켓 연결 해제 및 이벤트 리스너 제거
        drawSocket.off('drawing', onDrawingEvent);
        drawSocket.off('erase', onEraseEvent);
        drawSocket.disconnect();
      };
    }
  }, [roomId, drawSocket]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    changeColor(event.target.value);
  };

  /// JSX
  return (
    <DrawingBox>
      <DrawingCanvas>
        <canvas
          ref={canvasRef}
          onMouseDown={startPaint}
          onMouseMove={paint}
          onMouseUp={exitPaint}
          onMouseLeave={exitPaint}
          className="canvas"
        />
        <DrawingTools>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
          />

          <ColorButton
            color="#F87070"
            onClick={() => changeColor('#F87070')}></ColorButton>
          <ColorButton
            color="#FFAB73"
            onClick={() => changeColor('#FFAB73')}></ColorButton>
          <ColorButton
            color="#FFD580"
            onClick={() => changeColor('#FFD580')}></ColorButton>
          <ColorButton
            color="#669966"
            onClick={() => changeColor('#669966')}></ColorButton>
          <ColorButton
            color="#4a8ef5"
            onClick={() => changeColor('#4a8ef5')}></ColorButton>
          <ColorButton
            color="#9966CC"
            onClick={() => changeColor('#9966CC')}></ColorButton>
          <ColorButton
            color="#363636"
            onClick={() => changeColor('#363636')}></ColorButton>
          <EraserIcon onClick={() => changeColor('white')}>
            <FontAwesomeIcon icon={faEraser} />
          </EraserIcon>

          <TrashIcon onClick={() => EraseAll()}>
            <FontAwesomeIcon icon={faTrash} />
          </TrashIcon>

          <RangeInput
            onChange={(e) => setLineWidth(Number(e.target.value))}
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={lineWidth}
            style={getRangeInputStyle()}></RangeInput>
        </DrawingTools>
      </DrawingCanvas>
    </DrawingBox>
  );
  // addEventListener를 포함한 useEffect를 제거하고 이렇게 간략화했습니다
};

const DrawingBox = styled.div``;

const DrawingCanvas = styled.div`
  width: 940px;
  height: 563px;
  position: relative;
  .canvas {
    width: 100%;
    height: 100%;
    border: 2px solid #313860;
    margin: 0 auto;
    border-radius: 15px;
  }
`;

const DrawingTools = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-radius: 0 0 15px 15px;
  background-color: #313860;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 25px;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color || 'transparent'};
  border-radius: 50%;
  border: 3px solid #fff;
  margin-left: -10px;
  color: #fff;
  font-size: 12px;
`;

const RangeInput = styled.input`
  background: linear-gradient(
    to right,
    #ffe283 0%,
    #ffe283 50%,
    #ececec 50%,
    #ececec 100%
  );
  border-radius: 8px;
  outline: none;
  transition: background 450ms ease-in;
  accent-color: #ffca1d;
`;

const EraserIcon = styled.button`
  color: #fff;
  font-size: 30px;
`;

const TrashIcon = styled.button`
  color: #fff;
  font-size: 30px;
`;

interface IReciveInfo {
  originalMousePosition: ICoordinate;
  newMousePosition: ICoordinate;
  option: {
    color: string;
    lineWidth: number;
    roomId: string;
  };
}

interface ICoordinate {
  x: number;
  y: number;
}

export default Drawing;
