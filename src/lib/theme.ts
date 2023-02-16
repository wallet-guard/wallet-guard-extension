import { extendTheme, propNames, ThemeConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({
  colors: {
    primary: '#00ff00'
  },
  semanticTokens: {
    colors: {
      success: {
        _dark: 'green.300',
        _light: 'green.600'
      },
      warn: {
        _dark: 'pink',
        _light: 'red.500'
      }
    }
  },
  config,
  components: {
    Button: {
      variants: {
        primary: {
          color: 'black',
          background: '#00ff00',
          _hover: {
            background: '#1cd412'
          }
        }
      }
    },
    Text: {
      variants: {
        muted: (props: StyleFunctionProps) => ({
          color: props.colorMode === 'dark' ? '#bdbdbd' : 'gray.600'
        })
      },
      defaultProps: {
        size: 'lg', // default is md
        variant: 'sm', // default is solid
        colorScheme: 'green' // default is gray
      }
    },
    Tooltip: {
      variants: {
        default: {
          hasArrow: true,
          bg: "#212121",
          color: "white",
          className: "pl-2 pr-2 pt-1 pb-1",
        }
      },
    }
  }
});

export default theme;
