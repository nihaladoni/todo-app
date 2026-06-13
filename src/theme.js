import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Raleway', sans-serif",
    body: "'Montserrat', sans-serif",
  },
  colors: {
    brand: {
      50: '#F0F3FF',
      100: '#D9E2FF',
      200: '#B8C8FF',
      300: '#94A7FF',
      400: '#7083FF',
      500: '#6366F1', // Main indigo
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#1E1B4B',
    },
    priority: {
      high: '#F43F5E',    // Rose
      medium: '#F59E0B',  // Amber
      low: '#3B82F6',     // Blue
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0F172A' : '#F8FAFC',
        color: props.colorMode === 'dark' ? '#F8FAFC' : '#1E293B',
        transitionProperty: 'background-color, color',
        transitionDuration: '0.2s',
      },
      option: {
        background: props.colorMode === 'dark' ? '#1E293B' : 'white',
        color: props.colorMode === 'dark' ? '#F8FAFC' : '#1E293B',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'xl',
      },
    },
    Input: {
      parts: ['field'],
      variants: {
        outline: (props) => ({
          field: {
            borderRadius: 'xl',
            bg: props.colorMode === 'dark' ? '#1E293B' : 'white',
            borderColor: props.colorMode === 'dark' ? '#334155' : '#E2E8F0',
            _hover: {
              borderColor: props.colorMode === 'dark' ? '#475569' : '#CBD5E1',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #6366F1',
            },
          },
        }),
      },
    },
    Select: {
      parts: ['field'],
      variants: {
        outline: (props) => ({
          field: {
            borderRadius: 'xl',
            bg: props.colorMode === 'dark' ? '#1E293B' : 'white',
            borderColor: props.colorMode === 'dark' ? '#334155' : '#E2E8F0',
            _hover: {
              borderColor: props.colorMode === 'dark' ? '#475569' : '#CBD5E1',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #6366F1',
            },
          },
        }),
      },
    },
    Checkbox: {
      parts: ['control'],
      baseStyle: (props) => ({
        control: {
          borderRadius: 'md',
          borderColor: props.colorMode === 'dark' ? '#475569' : '#CBD5E1',
          _checked: {
            bg: 'brand.500',
            borderColor: 'brand.500',
            color: 'white',
            _hover: {
              bg: 'brand.600',
              borderColor: 'brand.600',
            },
          },
        },
      }),
    },
  },
});
