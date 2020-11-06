import { theme } from "@chakra-ui/core";

export default {
  ...theme,
  colors: {
    ...theme.colors,
    lightBlue: "#4460F7",
    darkBlue: "#2140E8",
    standardOrange: "#F9A52B",
    lightGray: "#E0E2EA",
    standardGray: "#B9BDCF",
    darkGray: "#9194A5",
    standardBlack: "#1A1B1D",
    darkWhite: "#F0F1F5",
    basicGray: "#F2F2F2",
  },
  spiner: {
    thickness: "4px",
    speed: "0.65s",
    emptyColor: "lightGray",
    color: "lightBlue",
  },
  buttons: {
    outline: {
      border: "1px solid",
      borderColor: "lightBlue",
      color: "lightBlue",
      background: "#FFFFFF",
      borderRadius: "4px",
      fontSizes: "sm",
      _hover: {
        color: "darkblue",
        borderColor: "darkBlue",
      },
      _focus: {
        outline: "none",
      },
      _active: {
        opacity: 0.8,
      },
      _disabled: {
        color: "darkGray",
        borderColor: "darkGray",
      }
    },
    full: {
      background: "#4460F7",
      color: "#FFFFFF",
      borderRadius: "4px",
      border: "none",
      _hover: {
        background: "#2140E8",
      },
      _active: {
        opacity: 0.8,
      },
      _focus: {
        outline: "none",
      },
      _disabled: {
        background: "#9194A5",
      }
    },
  },
  input: {
    bg: "#ffffff",
    border: "1px solid",
    borderColor: "lightGray",
    borderRadius: "8px",
    _focus: {
      outline: "none",
    }
  }
};