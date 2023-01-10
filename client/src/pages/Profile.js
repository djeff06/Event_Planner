import React from "react";
import { UploadImage } from "../components/UploadImage";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";

export default function Profile() {
 
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const initialValues = {
    username: "",
  
  };
  const checkoutSchema = yup.object().shape({
    username: yup.string(),
   
  });

  return (
    <div className=" ">
      <Box m="20px">
        <Header title="EDIT PROFILE" subtitle="" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center ">
                <UploadImage />
              </div>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
               mx="100px"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                />
               
              
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained" >
                  Update
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
