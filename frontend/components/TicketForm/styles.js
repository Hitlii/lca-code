import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    root: {
      display:'block',
      maxWidth: 600,
      minWidth: 320,
      margin: "auto",
    },
    smallInput: {
      width: 100,
    },
    gridItem: {
      textAlign: "center",
    },
    map: {
      display: "float",
    },
    headers: {
      marginLeft: "10%",
      fontSize: "18px",
      [theme.breakpoints.up("sm")]: {
        marginLeft: "30%",
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: "40%",
      },
    },
    center: {
      display: "flex",
      textAlign: "center",
    },
    divider: {
      width: 340,
      color: "#f2f2f2",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 20,
    },
    multiline: {
      width: 320,
      marginBottom: 20,
    },
  }));

export const defaultInputProps = {
    fullWidth: true,
    size: "medium",
    margin: "dense",
    variant: "filled",
};

export const defaultTypoProps = {
    align: "left",
    display: "block",
    gutterBottom: true,
    variant: "h5",
};

export const requiredInputs = {
    required: true,
    title: "Por favor, llene este campo.",
};