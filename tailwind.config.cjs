const distance = {
  inherit: 'inherit',
  d2: '2px',
  d3: '3px',
  d4: '4px',
  'screen-10': '10%',
  'screen-20': '20%',
  'screen-30': '30%',
  'screen-40': '40%',
  'screen-50': '50%',
  'screen-60': '60%',
  'screen-70': '70%',
  'screen-80': '80%',
  'screen-90': '90%',
};

const colors = {
  gray: {
    '05': 'var(--gray-05)',
    1: 'var(--gray-1)',
    2: 'var(--gray-2)',
    3: 'var(--gray-3)',
    4: 'var(--gray-4)',
    5: 'var(--gray-5)',
    6: 'var(--gray-6)',
    7: 'var(--gray-7)',
    8: 'var(--gray-8)',
    9: 'var(--gray-9)',
  },

  white: 'var(--white)',
  'white-opacity': {
    1: 'var(--white-opacity-1)',
    2: 'var(--white-opacity-2)',
    3: 'var(--white-opacity-3)',
    4: 'var(--white-opacity-4)',
    5: 'var(--white-opacity-5)',
    6: 'var(--white-opacity-6)',
    7: 'var(--white-opacity-7)',
    8: 'var(--white-opacity-8)',
    9: 'var(--white-opacity-9)',
  },

  black: 'var(--black)',
  'black-opacity': {
    1: 'var(--black-opacity-1)',
    2: 'var(--black-opacity-2)',
    3: 'var(--black-opacity-3)',
    4: 'var(--black-opacity-4)',
    5: 'var(--black-opacity-5)',
    6: 'var(--black-opacity-6)',
    7: 'var(--black-opacity-7)',
    8: 'var(--black-opacity-8)',
    9: 'var(--black-opacity-9)',
  },
};

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
  ],
  theme: {
    extend: {
      colors,
      backgroundColor: {
        ...colors,
        body: 'var(--background-body)',
        current: 'currentColor',
      },
      textColor: {
        body: 'var(--text-body)',
        'body-dark': 'var(--text-body-dark)',
        secondary: 'var(--text-secondary)',
        current: 'currentColor',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
        },
      },
      fontSize: {
        small: '12px',
        normal: '14px',
        large: '18px',
      },
      width: distance,
      minWidth: distance,
      maxWidth: distance,
      height: distance,
      minHeight: distance,
      maxHeight: distance,
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
  corePlugins: {
    preflight: false, // 避免和antd冲突
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
