import React from 'react';
import { OpenchatAvatarWrap } from '../../styles/OpenchatStyle';

interface OpenchatAvatarProps {
  src: string;
  alt: string;
}

function OpenchatAvatar({ src, alt }: OpenchatAvatarProps) {
  const reg = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/gim;
  const text = alt.replace(reg, '').slice(0, 2);

  return (
    <OpenchatAvatarWrap className="user-img">
      <svg
        className="svg-profile"
        viewBox="0 0 88 88"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id="shapeSquircle"
            d="M44,0 C76.0948147,0 88,11.9051853 88,44 C88,76.0948147 76.0948147,88 44,88 C11.9051853,88 0,76.0948147 0,44 C0,11.9051853 11.9051853,0 44,0 Z"
          />
          <clipPath id="clipSquircle">
            <use xlinkHref="#shapeSquircle" />
          </clipPath>
        </defs>

        <rect
          className="default-bg"
          data-color="10"
          clipPath="url(#clipSquircle)"
          x="0"
          y="0"
          width="88"
          height="88"
        />
        <text
          className="default-txt"
          x="50%"
          y="50%"
          dy="10"
          textAnchor="middle"
        >
          {text}
        </text>

        <image
          className="user-photo"
          width="88"
          height="88"
          clipPath="url(#clipSquircle)"
          xlinkHref={src}
        />
      </svg>
    </OpenchatAvatarWrap>
  );
}

export default OpenchatAvatar;
