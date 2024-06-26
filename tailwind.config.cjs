const distance = {
  inherit: 'inherit',
  d2: '2px',
  d3: '3px',
  d4: '4px',
  header: '64px',
  18: '72px',
  20: '80px',
  30: '120px',
  40: '160px',
  50: '200px',
  60: '240px',
  70: '280px',
  80: '320px',
  90: '360px',
  100: '400px',
  110: '440px',
  120: '480px',
  130: '520px',
  140: '560px',
  150: '600px',
  sm: '640px',
  md: '854px',
  lg: '1280px',
  xl: '1920px',
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

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{jsx,tsx,scss,mdx}'],
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
    screens: {
      // sm: '640px', // 参考: 640*360 (16:9) 360P
      // => @media (min-width: 640px) { ... }

      // md: '854px', // 参考: 854*480 (16:9) 480P
      // => @media (min-width: 768px) { ... }

      lg: '1280px', // 参考: 1280*720 (16:9) 720P
      // => @media (min-width: 1024px) { ... }

      xl: '1920px', // 参考: 1920*1080 (16:9) 1080P
      // => @media (min-width: 1440px) { ... }

      // '2xl': '2560px', // 参考: 2560*1440 (16:9) 2k
      // => @media (min-width: 2560px) { ... }

      // '3xl': '3440px', // 参考: 3840*2160 (16:9) 4k
      // => @media (min-width: 3440px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '4rem',
        xl: '8rem',
      },
    },
    extend: {
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
      margin: distance,
      padding: distance,
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
