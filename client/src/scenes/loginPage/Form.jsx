import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Tooltip,
  styled
}
  from '@mui/material';
//EditOutlinedIcon
import EditIcon from '@mui/icons-material/Edit';
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from "react-dropzone";
import FlexBetween from 'components/FlexBetween';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required").min(8).max(8),
  picture: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  bio: yup.string().required("required").max(200, "Bio must be atmost 200 characters"),
  relationshipStatus: yup.string().notRequired(),
  dob: yup.date().nullable().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required").min(8).max(8),
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
  location: "",
  occupation: "",
  bio: "",
  relationshipStatus: "Single",
  dob: null
};

const initialValuesLogin = {
  email: "",
  password: "",
};

//console.log("It is being rendered")

const Form = () => {
  const [pageType, setPageType] = useState("login");
  //const theme = useTheme();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  console.log("Page type: ", pageType);

  const register = async (values, onSubmitProps) => {
    //this allows us to send form info with image 
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    console.log(values);

    formData.append('picturePath', values.picture.name);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }



  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            color="primary"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              //child divs of Box
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4"
              }
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Email ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* Picture path */}

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                  >


                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": { cursor: "pointer" }
                        }}
                      >
                        <input
                          {...getInputProps()}
                        />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Bio (About Yourself)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={Boolean(touched.bio) && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  multiline
                  sx={{ gridColumn: "span 4" }}
                />

                {/* relationship status and dob field to be added */}
                {/* relationship status */}
                <Box
                  sx={{
                    gridColumn: "span 2"
                  }}
                >

                  <Select
                    label="Status"
                    value={values.relationshipStatus}
                    name="relationshipStatus"
                    defaultValue="Single"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.relationshipStatus) && Boolean(errors.relationshipStatus)}
                    InputLabelProps={{ helperText: touched.relationshipStatus && errors.relationshipStatus }}
                    sx={{
                      minWidth: 200,
                    }}
                  >

                    <MenuItem
                      value="Single"
                    >
                      Single
                    </MenuItem>
                    <MenuItem
                      value="Married"
                    >
                      Married
                    </MenuItem>
                    <MenuItem
                      value="It's complicated"
                    >
                      It's complicated
                    </MenuItem>
                    <MenuItem
                      value="Friends With Benefits"
                    >
                      Friends With Benefits
                    </MenuItem>
                  </Select>
                </Box>
                {/* date of birth */}

                <Box
                  sx={{ gridColumn: "span 2" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Enter your dob"
                      onChange={(date) => setFieldValue('dob', date)}
                      onBlur={handleBlur}
                      value={values.dob}
                      error={Boolean(touched.dob) && Boolean(errors.dob)}
                      helperText={touched.dob && errors.dob}

                    />
                  </LocalizationProvider>
                </Box>

              </>
            )}
            {isLogin && (
              <>
                <TextField
                  label="Email ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

          </Box>

          {/* SUBMIT BUTTON */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main }
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login")
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                }
              }}
            >
              {isLogin ? "Don't have an account? Sign Up here." :
                "Already have an account? Login here."
              }
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form