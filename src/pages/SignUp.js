import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import FormContainer from "../components/Form/FormContainer";

import {  Heading, Button, VStack, HStack, useColorMode, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import TextField from "../components/Form/TextField";
import { Formik, Form } from "formik";
import YupValidation, { initialValues } from "../components/Form/YupSignUp";

export default function SignUp() {
  // Init
  const auth = getAuth();
  const Navigate = useNavigate();
  const { colorMode } = useColorMode();

  const SignUp = (values, actions) => {
    console.log(actions)
    createUserWithEmailAndPassword(auth, values.email, values.confirmPassword)
      .then(() => {
        actions.setSubmitting(false);
      })
      .catch(() => {
        actions.setSubmitting(false);
      });
  };

  const navToSignIn = () => {
    Navigate("/signin");
  };

  return (
    <FormContainer>
      <Heading
        fontSize={{ base: "3xl", md: "3xl" }}
        fontWeight="bold"
        textAlign="center"
        mb={6}
      >
        Create your account
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidation}
        onSubmit={SignUp}
      >
        {(props) => (
          <Form>
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
            <TextField
              name="confirmPassword"
              type="password"
              title="Confirm Password"
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
                  Sign Up
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
      <Flex align="center" justify="center" gap={2} w="full" py={4}>
        <Text fontSize="sm" color="gray.500">
          Already have an account?
        </Text>
        <Button
          onClick={navToSignIn}
          variant="link"
          color={colorMode === "light" ? "blue.600" : "blue.400"}
          fontSize="sm"
          p={0}
          h="auto"
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Sign In
        </Button>
      </Flex>
    </FormContainer>
  );
}
