import React from 'react'

const SVGIcon: React.FC<{ icon: Icon; className?: string }> = props => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={['icon', `icon__${props.icon}`, props.className].join(' ')}
    width={24}
    height={24}
    role="img"
  >
    {icons[props.icon]}
  </svg>
)

export const paths = {
  logo: [
    'M6.75789 0.189453C8.63157 0.189453 10.1684 0.431558 11.3684 0.915769C12.5895 1.37893 13.4947 2.08419 14.0842 3.03156C14.6737 3.97893 14.9684 5.1684 14.9684 6.59998C14.9684 7.79998 14.7474 8.79998 14.3053 9.59998C13.8632 10.4 13.2947 11.0421 12.6 11.5263C11.9263 11.9895 11.2105 12.3579 10.4526 12.6316L16.6421 22.7368H13.3263L7.86315 13.421H3.37894V22.7368H0.536835V0.189453H6.75789ZM6.59999 2.65261H3.37894V11.021H6.75789C7.97894 11.021 8.97894 10.8631 9.75789 10.5474C10.5368 10.2105 11.1053 9.7263 11.4632 9.09472C11.8421 8.46314 12.0316 7.67367 12.0316 6.7263C12.0316 5.73682 11.8316 4.94735 11.4316 4.35788C11.0526 3.7684 10.4632 3.33682 9.66315 3.06314C8.86315 2.78945 7.8421 2.65261 6.59999 2.65261Z',
    'M19.3917 21.0316C19.3917 20.2526 19.5812 19.7052 19.9601 19.3895C20.3391 19.0737 20.7917 18.9158 21.318 18.9158C21.8654 18.9158 22.3285 19.0737 22.7075 19.3895C23.1075 19.7052 23.3075 20.2526 23.3075 21.0316C23.3075 21.7895 23.1075 22.3368 22.7075 22.6737C22.3285 23.0105 21.8654 23.1789 21.318 23.1789C20.7917 23.1789 20.3391 23.0105 19.9601 22.6737C19.5812 22.3368 19.3917 21.7895 19.3917 21.0316Z',
  ],
  heart: [
    'M11.761 20.854C9.59097 19.518 7.57097 17.946 5.73897 16.165C4.45097 14.883 3.47097 13.32 2.87297 11.595C1.79697 8.25 3.05298 4.421 6.57098 3.288C8.41998 2.692 10.438 3.033 11.996 4.201C13.554 3.034 15.572 2.694 17.421 3.288C20.938 4.421 22.204 8.25 21.128 11.595C20.53 13.32 19.55 14.883 18.262 16.165C16.43 17.945 14.411 19.518 12.24 20.854L12.005 21L11.761 20.854V20.854Z',
    'M15.74 7.053C16.805 7.393 17.561 8.35 17.656 9.475',
  ],
  img: [
    'M16.303 2.75H7.654C4.64 2.75 2.75 4.884 2.75 7.904V16.054C2.75 19.074 4.631 21.207 7.654 21.207H16.302C19.326 21.207 21.207 19.073 21.207 16.053V7.904C21.207 4.884 19.327 2.75 16.303 2.75Z',
    'M10.703 8.786C10.703 9.805 9.87602 10.632 8.85702 10.632C7.83902 10.632 7.01202 9.805 7.01202 8.786C7.01202 7.766 7.83902 6.94 8.85702 6.94C9.87702 6.94 10.703 7.767 10.703 8.786Z',
    'M21.207 14.95C20.213 14.086 19.347 13.045 18.207 12.358C17.066 11.67 15.839 12.094 15.047 13.119C14.282 14.111 13.804 15.444 12.649 16.069C11.226 16.839 10.389 15.597 9.203 15.099C7.878 14.543 6.872 15.541 6.098 16.5C5.323 17.46 4.538 18.41 3.75 19.36',
  ],
  close:
    'M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z',
  grid: [
    'M1 3C1 1.89543 1.89543 1 3 1H8C9.10457 1 10 1.89543 10 3V8C10 9.10457 9.10457 10 8 10H3C1.89543 10 1 9.10457 1 8V3Z',
    'M14 3C14 1.89543 14.8954 1 16 1H21C22.1046 1 23 1.89543 23 3V8C23 9.10457 22.1046 10 21 10H16C14.8954 10 14 9.10457 14 8V3Z',
    'M1 16C1 14.8954 1.89543 14 3 14H8C9.10457 14 10 14.8954 10 16V21C10 22.1046 9.10457 23 8 23H3C1.89543 23 1 22.1046 1 21V16Z',
    'M14 16C14 14.8954 14.8954 14 16 14H21C22.1046 14 23 14.8954 23 16V21C23 22.1046 22.1046 23 21 23H16C14.8954 23 14 22.1046 14 21V16Z',
  ],
  mason: [
    'M1 3C1 1.89543 1.89543 1 3 1H8C9.10457 1 10 1.89543 10 3V10C10 11.1046 9.10457 12 8 12H3C1.89543 12 1 11.1046 1 10V3Z',
    'M14 3C14 1.89543 14.8954 1 16 1H21C22.1046 1 23 1.89543 23 3V6C23 7.10457 22.1046 8 21 8H16C14.8954 8 14 7.10457 14 6V3Z',
    'M1 18C1 16.8954 1.89543 16 3 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H3C1.89543 23 1 22.1046 1 21V18Z',
    'M14 14C14 12.8954 14.8954 12 16 12H21C22.1046 12 23 12.8954 23 14V21C23 22.1046 22.1046 23 21 23H16C14.8954 23 14 22.1046 14 21V14Z',
  ],
  light:
    'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z',
  dark: 'M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z',
}

const icons = buildPaths(paths)

function buildPaths<T>(paths: T): { [K in keyof T]: SVGPathElement[] } {
  return Object.fromEntries(
    Object.entries(paths).map(([k, v]) => [
      k,
      (Array.isArray(v) ? v : [v]).map((d: string, i) => (
        <path
          key={`${k}-${i}`}
          d={d}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      )),
    ])
  ) as any
}

export type Icon = keyof typeof icons
export default SVGIcon
