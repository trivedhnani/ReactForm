import React from "react";
// import FormInput from "../Components/FormInput/formInput.component";
import FormTextField from "../Components/FormText/form.textField";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  Select,
  FormControlLabel,
  MenuItem,
  InputLabel
} from "@material-ui/core";
// import { spacing } from "@material-ui/system";
class FormPage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      firstname: "",
      lastname: "",
      hobbies: "",
      add: { values: [], error: false },
      comments: "",
      email: {
        value: "",
        error: false,
        regExp: /^\w+([.-]?\w+)*@\w+(\.\w{2,3})+$/
      },
      phone: {
        value: "",
        error: false,
        regExp: /^(\+1)?\d{3}(-)?\d{3}(-)?\d{4}$/
      },
      zip: { value: "", error: false, regExp: /^\d{5}$/ }
    };
  }
  handleChange = field => {
    return event => {
      this.setState({ [field]: event.target.value }, () => {
        console.log(this.state[field]);
      });
    };
  };
  handleCheck = event => {
    let values = this.state.add.values;
    if (event.target.checked) {
      values = values.includes(event.target.value)
        ? values
        : [...values, event.target.value];
    } else {
      if (values.includes(event.target.value)) {
        values.splice(values.indexOf(event.target.value), 1);
      }
    }
    const error = values.length > 0 ? false : true;
    this.setState({ add: { values, error } }, () => {
      console.log(this.state.add);
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { email, phone, zip, add } = this.state;
    if (add.length === 0) {
      this.setState({ add: { ...this.state.add, error: true } });
    }
    if (
      !email.error &&
      !phone.error &&
      !zip.error &&
      !add.error &&
      add.values.length > 0
    ) {
      alert("success");
    } else {
      alert("Please fill required fields");
    }
  };
  handleErrorCheck = field => {
    return event => {
      const value = event.target.value;
      const { regExp } = this.state[field];
      if (value.search(regExp) === -1) {
        this.setState({ [field]: { value, error: true, regExp } });
      } else {
        this.setState({ [field]: { value, error: false, regExp } });
      }
    };
  };
  componentDidMount() {}
  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{ marginTop: "100px", marginBottom: "150px" }}
      >
        <Grid item xs={12}>
          <form style={{ minWidth: "500px" }} onSubmit={this.handleSubmit}>
            <Grid container direction="column" spacing={2} alignItems="stretch">
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth required>
                  <Grid container justify="space-between">
                    <Grid item component="span">
                      <FormLabel
                        component="legend"
                        style={{ paddingTop: "15px", paddingLeft: "2px" }}
                      >
                        Title
                      </FormLabel>
                    </Grid>
                    <Grid item component="span">
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        required
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <FormControlLabel
                          value="Mr."
                          control={<Radio required />}
                          label="Mr."
                        />
                        <FormControlLabel
                          value="Mrs."
                          control={<Radio required />}
                          label="Mrs."
                        />
                        <FormControlLabel
                          value="Miss."
                          control={<Radio required />}
                          label="Miss."
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <FormTextField
                label="First Name"
                required
                value={this.state.firstname}
                onChange={this.handleChange("firstname")}
              />
              <FormTextField
                label="Last Name"
                required
                value={this.state.lastname}
                onChange={this.handleChange("lastname")}
              />
              <FormTextField
                label="Email"
                type="email"
                required
                value={this.state.email.value}
                onChange={this.handleErrorCheck("email")}
                error={this.state.email.error}
              />
              <FormTextField
                label="Phone Number"
                value={this.state.phone.value}
                required
                onChange={this.handleErrorCheck("phone")}
                error={this.state.phone.error}
              />
              <FormTextField
                label="ZipCode"
                value={this.state.zip.value}
                required
                error={this.state.zip.error}
                onChange={this.handleErrorCheck("zip")}
              />
              <Grid item>
                <FormControl required fullWidth component="fieldset">
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      <FormLabel
                        component="legend"
                        error={this.state.add.error}
                        style={{ paddingTop: "14px", paddingLeft: "2px" }}
                      >
                        How did you hear?
                      </FormLabel>
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="Facebook"
                        label="Facebook"
                        control={<Checkbox onClick={this.handleCheck} />}
                      ></FormControlLabel>
                      <FormControlLabel
                        value="Google"
                        label="Google"
                        control={<Checkbox onClick={this.handleCheck} />}
                      ></FormControlLabel>
                      <FormControlLabel
                        value="Yelp"
                        label="Yelp"
                        control={<Checkbox onClick={this.handleCheck} />}
                      ></FormControlLabel>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <FormTextField
                label="Comments"
                multiline
                required
                onChange={this.handleChange("comments")}
              />
              <Grid item>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Hobbies</InputLabel>
                  <Select
                    value={this.state.hobbies}
                    onChange={this.handleChange("hobbies")}
                  >
                    <MenuItem value="Cricket">Cricket</MenuItem>
                    <MenuItem value="PUBG">PUBG</MenuItem>
                    <MenuItem value="Reading">Reading</MenuItem>
                    <MenuItem value="Movies">Movies</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <Grid container direction="row" justify="space-evenly">
                    <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<SendOutlinedIcon />}
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<RotateLeftOutlinedIcon />}
                        color="secondary"
                        type="reset"
                        onClick={event => {
                          event.preventDefault();
                          window.location.reload();
                        }}
                      >
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}
export default FormPage;
