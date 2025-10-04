import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

import { useEffect } from "react";


import { useNavigate } from "react-router-dom";
import FormContainer from "../components/Form/FormContainer";

import { Divider, Heading, Button, VStack, HStack, useColorMode, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import YupValidation, { initialValues } from "../components/Form/YupSignIn";
import TextField from "../components/Form/TextField";
import { Formik, Form } from "formik";


export default function Signin() {


  const Navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Navigate("/main");
      }
    });
    // eslint-disable-next-line
  }, [auth]);

  const NavToSignUp = () => {
    Navigate("/signup");
  };

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((cred) => {
        console.log("Log in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignInWithEmailPassword = (values, actions) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        actions.setSubmitting(false);
        console.log("Sign in Successfully");
      })
      .catch((err) => {
        actions.setSubmitting(false);
        console.error("Something went wrong", err);
      });
  };

  return (
    <FormContainer >
      <Heading
        as={motion.h1}
        fontSize={{ base: "3xl", md: "3xl" }}
        fontWeight="bold"
        textAlign="center"
        mb={6}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Welcome back
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidation}
        onSubmit={SignInWithEmailPassword}
      >
        {(props) => (
          <Form
            as={motion.form}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <TextField
              name="email"
              type="email"
              title="Email"
              YupValidation={YupValidation}
            />
            <TextField
              name="password"
              type="password"
              title="Password"
              YupValidation={YupValidation}
            />

            <VStack w={"full"} marginTop="2" spacing={"2"} alignItems="center">
              <HStack w={"full"}>
                <Button
                  as={motion.button}
                  type="submit"
                  isLoading={props.isSubmitting}
                  w={"full"}
                  bgColor={colorMode === "light" ? "red.700" : "red.400"}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Log In
                </Button>
                <Button
                  as={motion.button}
                  type="reset"
                  w="full"
                  color={colorMode === "light" ? "gray.500" : "gray.300"}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Reset
                </Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
      <Flex 
        as={motion.div}
        align="center" 
        justify="center" 
        gap={2} 
        w="full" 
        py={4}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <Text fontSize="sm" color="gray.500">
          Don't have an account?
        </Text>
        <Button
          as={motion.button}
          onClick={NavToSignUp}
          variant="link"
          color={colorMode === "light" ? "blue.600" : "blue.400"}
          fontSize="sm"
          p={0}
          h="auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Sign Up
        </Button>
      </Flex>
      <Flex 
        as={motion.div}
        align="center" 
        w="full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <Divider borderColor="gray.300" />
        <Text px={2} fontSize="sm" color="gray.500">
          or
        </Text>
        <Divider borderColor="gray.300" />
      </Flex>

      <Button
        as={motion.button}
        onClick={SignInWithGoogle}
        w={"full"}
        bgColor={colorMode === "light" ? "green.600" : "green.400"}
        color="white"
        leftIcon={<img src="/google.svg" width="20" height="20" alt="Google" />}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.98 }}
      >
        Sign in with Google
      </Button>
    </FormContainer>
  );
}
