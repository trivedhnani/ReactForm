import React from "react";
import { TextField, Grid } from "@material-ui/core";
// import { spacing } from "@material-ui/system";
const FormTextField = ({ label, ...otherProps }) => (
  <Grid item xs={12}>
    <TextField
      variant="outlined"
      label={label}
      fullWidth
      {...otherProps}
    ></TextField>
  </Grid>
);
export default FormTextField;
