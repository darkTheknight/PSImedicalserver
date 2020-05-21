import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { register } from './UserFunctions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
      Public Service Inquiry System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component{

    constructor(props){
        super(props)
        this.state ={
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            rePassword: '',
            errors:{
              first_name: '',
              last_name: '',
              email: '',
              password: ''
            },
            email_error: false,
            password_error: false,
            first_name_error: false,
            last_name_error: false

        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          case 'password': 
            errors.password = 
              value.length < 8
                ? 'Password must be 8 characters long!'
                : '';
            break;
          default:
            break;
        }

        this.setState({errors, [name]: value});

    }

    onSubmit(event){
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
      console.log(this.state.first_name.length)
      if (this.state.first_name.length===0){
        errors.first_name = 'This field is required';
        this.setState({first_name_error : true})
      }
      else{
        errors.first_name = '';
        this.setState({first_name_error : false})
      }
      if (this.state.last_name.length===0){
        errors.last_name = 'This field is required';
        this.setState({last_name_error : true})
      }
      else{
        errors.last_name = '';
        this.setState({last_name_error : false})
      }
      if (validEmailRegex.test(this.state.email)){

      }
      else{
        errors.email = 'Email is not valid'
        this.setState({email_error : true})
      }
      if (this.state.password.length<8){
        errors.password = 'Password must be at least 8 characters long'
        this.setState({password_error : true})
      }
      else{
        errors.password = ''
        this.setState({password_error : false})
      }
      this.setState({errors, [name]: value});
      console.log(this.state.errors)

      if (validateForm(this.state.errors)){
        const newUser = {
          first_name : this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.password,
          email: this.state.email
        }
        register(newUser).then(res =>{
            this.props.history.push(`/login`)
        })
      }

      else{
        console.log("Invalid form")
      }
      
    }
    

    render(){
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit = {this.onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        errors = {this.state.first_name_error===true }
                        autoComplete="fname"
                        name="first_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        autoFocus
                        helperText={this.state.errors.first_name}
                        value = {this.state.firstName}
                        onChange = {this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        errors={this.state.last_name_error===true}
                        variant="outlined"
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="lname"
                        helperText={this.state.errors.last_name}
                        value = {this.state.lastName}
                        onChange = {this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error = {this.state.errors.email}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        helperText = {this.state.errors.email}
                        value = {this.state.email}
                        onChange = {this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={this.state.errors.password}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={this.state.errors.password}
                        value = {this.state.password}
                        onChange = {this.onChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
          );
    }
  
}

const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default withStyles(useStyles)(withRouter(Register))