import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Drawing = () => {
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(4);

  const canvasRef = useRef<HTMLCanvasElement>(null); // 캔버스 (도화지)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null); // 그림 (내용)

  // useEffect 하나 쓰려고 if문 썼습니다
  useEffect(() => {
    const canvas = canvasRef.current; // 캔버스 Ref
    if (canvas && !contextRef.current) {
      // 최초 마운트 시에만 실행
      canvas.width = 500;
      canvas.height = 500;
      canvas.style.width = '500px';
      canvas.style.height = '500px';
      canvas.style.backgroundColor = 'white';

      // 그리기
      const ctx = canvas.getContext('2d');
      ctx!.scale(1, 1);
      ctx!.lineCap = 'round';
      ctx!.lineWidth = lineWidth;
      contextRef.current = ctx;
    }

    // 색상 변경
    const ctx = contextRef.current; // context Ref
    if (ctx) {
      ctx.strokeStyle = color;
    }

    // 굵기 변경
    if (canvas && ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  /// 색상 변경 함수 (여기에 부분 지우개 배경색으로 넣음)
  const changeColor = (newColor: string) => {
    setColor(newColor);
  };

  /// 전체 지우개 함수
  const EraseAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    ctx!.fillStyle = 'white';
    ctx!.fillRect(0, 0, 500, 500);
  };

  /// 굵기 변경 함수

  /// 마우스 이동 감지 + 그리는 역할
  const getDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!canvasRef.current) {
      return;
    }

    const canvasCurrent: HTMLCanvasElement = canvasRef.current;

    return {
      x: event.pageX - canvasCurrent.offsetLeft,
      y: event.pageY - canvasCurrent.offsetTop,
      // offsetLeft는 그리는 영역 left끝에서 그림판이 얼마나 떨어졌냐.. top은 위에서 그림판이 얼마나 떨어졋냐
      // event.pageX/Y는 마우스로 그리는 부분의 좌표.. X는 왼쪽에서 떨어진만큼 빼야하고 Y는 위에서 떨어진 만큼 빼야함.
    };
  };

  /// mousedown 했을 때 좌표 저장 + 페인팅 시작 상태값 변경
  const startPaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const paint = getDrawing(event);
    console.log(paint);

    if (paint) {
      setIsPainting(true); // 그리는 상태 true로 변경
      setMousePosition(paint); // 마우스 포지션에 좌표값 저장
    }
  };

  /// 그리기 (현재 좌표 -> 움직인 좌표로 이동)
  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPainting) {
      // 그리는 상태가 true일 때
      const newMousePosition = getDrawing(event); // 좌표를 변
      if (mousePosition && newMousePosition) {
        draw(mousePosition, newMousePosition); // 아래 mouseEvent 함수임
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
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y); // moveTo(여기서 시작)부터 lineTo 지점까지
      ctx.lineTo(newMousePosition.x, newMousePosition.y); // 그리기(이게 반복되면 게속 그려지게)
      ctx.closePath();
      // path는 점 하나를 잇는 것이 아니라 여러 개 = 경로가 만들어짐
      ctx.stroke(); // 선을 그어라(여기서 선이 그려짐)
    }
  };

  /// JSX
  return (
    <>
      <DrawingCanvas>
        <canvas
          ref={canvasRef}
          onMouseDown={startPaint}
          onMouseMove={paint}
          onMouseUp={exitPaint}
          onMouseLeave={exitPaint}
          className="canvas"
        />
      </DrawingCanvas>
      <div>
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('yellow')}>Yellow</button>
        <button onClick={() => changeColor('green')}>Green</button>
        <button onClick={() => changeColor('blue')}>blue</button>
        <button onClick={() => changeColor('purple')}>purple</button>
        <button onClick={() => changeColor('black')}>Black</button>
        <button onClick={() => changeColor('white')}>Erase</button>

        <button onClick={() => EraseAll()}>EraseAll</button>

        <input
          onChange={(e) => setLineWidth(Number(e.target.value))}
          type="range"
          min="2"
          max="6"
          step="0.1"
          value={lineWidth}
        />
      </div>
    </>
  );
  // addEventListener를 포함한 useEffect를 제거하고 이렇게 간략화했습니다
};

const DrawingCanvas = styled.div`
  .canvas {
    border: 1px solid black;
    margin: 0 auto;
  }
`;

export default Drawing;
