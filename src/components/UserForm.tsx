import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import theme from "../utils/theme";
import { useState } from "react";
import OutputComponent from "./OutputComponent";
import {
  validateName,
  validateGender,
  validateMobileNumber,
  validateEmail,
  validateDOB,
  validateTechStack,
} from "../utils/checks";
import "./styles.css";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  mobileNumber: string;
  email: string;
  techStack: string[] | string;
}
const UserForm = () => {
  const methods = useForm<FormData>();
  const { control, handleSubmit, setValue } = methods;
  const [techStackFields, setTechStackFields] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [openOutputComponent, setOpenOutputComponent] =
    useState<boolean>(false);

  const onSubmit = (data: FormData) => {
    data.techStack = techStackFields;
    setValue("techStack", techStackFields);
    const validationErrors: Partial<FormData> = {};

    const dobError = validateDOB(data.dob);

    if (dobError) {
      validationErrors.dob = dobError;
    }

    //converting date in the desired format DD-MON-YYYY
    if (data.dob) {
      const dateParts = data.dob.split("-");
      const formattedDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      data.dob = formattedDate;
    }

    // Validate first name
    const firstNameError = validateName(data.firstName);
    if (firstNameError) {
      validationErrors.firstName = firstNameError;
    }

    // Validate last name
    const lastNameError = validateName(data.lastName);
    if (lastNameError) {
      validationErrors.lastName = lastNameError;
    }

    //validate gender
    const genderError = validateGender(data.gender);
    if (genderError) {
      validationErrors.gender = genderError;
    }

    const mobileNumberError = validateMobileNumber(data.mobileNumber);
    if (mobileNumberError) {
      validationErrors.mobileNumber = mobileNumberError;
    }
    const emailError = validateEmail(data.email);
    if (emailError) {
      validationErrors.email = emailError;
    }

    const techStackError = validateTechStack(data.techStack);
    if (techStackError) {
      validationErrors.techStack = techStackError;
    }

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data:", data);
      setErrors(validationErrors);
      handleSuccessfulSubmit();
    } else {
      setErrors(validationErrors);
      console.log("Validation errors:", validationErrors);
    }
  };

  const handleAddTechStackField = (e: any) => {
    e.preventDefault();
    setTechStackFields([...techStackFields, ""]);
  };

  const handleTechStackChange = (index: number, value: string) => {
    const updatedTechStackFields = [...techStackFields];
    updatedTechStackFields[index] = value;
    setTechStackFields(updatedTechStackFields);
  };

  const handleRemoveTechStackField = (index: number) => {
    setTechStackFields((prevFields) =>
      prevFields.filter((_, i) => i !== index)
    );
  };

  const handleSuccessfulSubmit = () => {
    setLoading(true);
    setOpenOutputComponent(false);
    setTimeout(() => {
      setLoading(false);
      setOpenOutputComponent(true);
    }, 3000);
  };

  return (
    <ChakraProvider theme={theme}>
      <FormProvider {...methods}>
        <div className="App">
          <header className="header">User Details</header>
          <div className="form-container">
            <div className="sub-title">Basic Details</div>
            <div className="name-fields"></div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ maxHeight: "500px" }}
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl id="firstName">
                  <FormLabel>First Name</FormLabel>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        variant="filled"
                        placeholder="Enter first name"
                        backgroundColor={"gray.300"}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <div style={{ color: "red", position: "absolute" }}>
                      {errors.firstName}
                    </div>
                  )}
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        variant="filled"
                        placeholder="Enter last name"
                        backgroundColor={"gray.300"}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <div style={{ color: "red", position: "absolute" }}>
                      {errors.lastName}
                    </div>
                  )}
                </FormControl>
                <FormControl id="mobileNumber">
                  <FormLabel className="mobileNumber">
                    Mobile Number 
                  </FormLabel>
                  <Controller
                    name="mobileNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        variant="filled"
                        placeholder="Enter Mobile Number"
                        backgroundColor={"gray.300"}
                      />
                    )}
                  />
                  {errors.mobileNumber && (
                    <div style={{ color: "red", position: "absolute" }}>
                      {errors.mobileNumber}
                    </div>
                  )}
                </FormControl>
                <FormControl id="email">
                  <FormLabel className="email">Email</FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="email"
                        {...field}
                        variant="filled"
                        placeholder="Enter email"
                        backgroundColor={"gray.300"}
                      />
                    )}
                  />
                  {errors.email && (
                    <div style={{ color: "red", position: "absolute" }}>
                      {errors.email}
                    </div>
                  )}
                </FormControl>
              </Grid>
              <div className="sub-title" style={{ marginTop: 40 }}>
                Other information
              </div>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl id="gender">
                  <FormLabel>Gender</FormLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="filled"
                        placeholder="Select gender"
                        backgroundColor={"gray.300"}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <div style={{ color: "red", position: "absolute" }}>
                      {errors.gender}
                    </div>
                  )}
                </FormControl>
                <FormControl id="dob">
                  <FormLabel>Date of Birth</FormLabel>
                  <Controller
                    name="dob"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        placeholder="DD/MM/YYYY"
                        onChange={(e) => {
                          field.onChange(e.target.value); // Update the field value with the selected date
                        }}
                        style={{
                          backgroundColor: "#CBD5E0",
                          border: "1px solid #CBD5E0",
                          borderRadius: "0.375rem",
                          padding: "0.5rem",
                          width: "100%",
                        }}
                      />
                    )}
                  />
                  {errors.dob && (
                    <div style={{ color: "red", position: "absolute" }}>
                      {errors.dob}
                    </div>
                  )}
                </FormControl>
              </Grid>
              <div className="tech-stack-subheading-div">
                <FormLabel style={{ marginBottom: 0 }}>Tech Stack</FormLabel>
                <button
                  onClick={(e) => handleAddTechStackField(e)}
                  style={{ fontWeight: "900", fontSize: 28 }}
                >
                  +
                </button>
              </div>
              <div style={{ height: "180px" }}>
                <Grid
                  templateColumns="repeat(1, 1fr)"
                  gap={4}
                  className="tech-stack-grid"
                  width={"52%"}
                >
                  {techStackFields.map((techStack, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Input
                        value={techStack}
                        // control={control}
                        onChange={(e) =>
                          handleTechStackChange(index, e.target.value)
                        }
                        variant="filled"
                        placeholder="Enter tech stack"
                        backgroundColor={"gray.300"}
                        style={{ marginRight: "8px" }}
                      />

                      {/* <Controller
                            name={`techStack[${index}]`}
                          control={control}
                          defaultValue={techStack}
                          render={({ field }) => (
                            <Input
                              {...field}
                              value={techStack}
                              onChange={(e) =>
                                handleTechStackChange(index, e.target.value)
                              }
                              variant="filled"
                              placeholder="Enter tech stack"
                              backgroundColor={"gray.300"}
                              style={{ marginRight: "8px" }}
                            />
                          )}
                        /> */}

                      {index > 0 && (
                        <button
                          onClick={() => handleRemoveTechStackField(index)}
                          style={{ fontWeight: "900", fontSize: 28 }}
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                  {errors.techStack && (
                    <div
                      style={{
                        color: "red",
                        position: "absolute",
                        transform: "translate(160%, 50%)",
                      }}
                    >
                      {errors.techStack}
                    </div>
                  )}
                </Grid>
              </div>
              {!loading ? (
                <Button
                  mt={4}
                  color={"white"}
                  backgroundColor={"gray.300"}
                  type="submit"
                  className="submit-button"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  mt={4}
                  color={"white"}
                  backgroundColor={"gray.300"}
                  className="submit-button"
                >
                  <Spinner size="sm" />
                </Button>
              )}
            </form>
          </div>
        </div>
        {openOutputComponent && <OutputComponent />}
      </FormProvider>
    </ChakraProvider>
  );
};

export default UserForm;
