import React from 'react';
import { useState, useEffect, useRef } from 'react';

const Drawing = () => {
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas!.width = 500;
    canvas!.height = 500;
    canvas!.style.width = `500px`;
    canvas!.style.height = `500px`;
    canvas!.style.backgroundColor = `skyblue`;

    const ctx = canvas!.getContext('2d');
    ctx!.scale(1, 1);
    ctx!.lineCap = 'round';
    ctx!.strokeStyle = 'black'; //색상
    ctx!.lineWidth = 4; // 굵기
    contextRef.current = ctx;
  }, []);

  ///

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

  ///

  const startPaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const paint = getDrawing(event);
    console.log(paint);

    if (paint) {
      setIsPainting(true); // 그리는 상태 true로 변경
      setMousePosition(paint); // 마우스 포지션에 좌표값 저장
    }
  };

  ///

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
  // 여기서 그리기를 줄 수 있음

  ///

  const exitPaint = () => {
    setIsPainting(false);
  };

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

  ///

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startPaint}
      onMouseMove={paint}
      onMouseUp={exitPaint}
      onMouseLeave={exitPaint}
    />
  );
};

export default Drawing;
