
import {
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

import {useStyles} from './styles'

function FilterIconButton({ name,className, Icon, text, onChange, index, stateButton }) {
  const classes = useStyles();

  return (
    <Button
      name={name}
      fullWidth
      className={className? className:classes.root}
      style={{ backgroundColor: stateButton ? "grey" : "#F2F2F2" }}
      onClick={() => {
        onChange(name, index);
      }}
    >
      <Grid container direction="column" alignItems="center">
        {Icon}
        <Typography variant="button" style={{ textTransform:"capitalize", color: stateButton ? "white" : "#4A4C4B"}}>{text}</Typography>
      </Grid> 
    </Button>
  );
}

export default FilterIconButton;