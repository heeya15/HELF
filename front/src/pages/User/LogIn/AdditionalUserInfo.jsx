import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  StepperWrapper,
  InputWrapper,
  Title,
  StepTitle,
  Message,
  inputBox,
  StyledTextField,
} from "./Login.style";
import { USER_ADDITIONAL_INFO_REQUEST } from "../../../store/modules/user";

const steps = ["개인 정보 입력", "신체 정보 입력", "세팅 완료!!"];

export default function AdditionalUserInfo() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [newBirthday, setNewBirthday] = useState("");
  const [newGender, setNewGender] = useState(false);
  const [message, setMessage] = useState("");
  const [newHeight, setNewHeight] = useState(0);
  const [newWeight, setNewWeight] = useState(0);

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 2) {
      dispatch({
        type: USER_ADDITIONAL_INFO_REQUEST,
        data: {
          birthday: newBirthday,
          gender: newGender,
          height: newHeight,
          weight: newWeight,
        },
      });
      history.push("/");
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (
      (activeStep === 0 && newBirthday.length < 10) ||
      (activeStep === 1 && (newHeight === 0 || newWeight === 0))
    ) {
      setMessage("정보를 모두 입력해주세요.");
    } else {
      setMessage("");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this, it should never occur
      // unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };


  const handleNewBirthday = (event) => {
    setMessage("");
    event.target.value = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    setNewBirthday(event.target.value);
  };

  const handleNewGender = (event) => {
    setNewGender(event.target.value);
  };

  const handleNewHeight = (event) => {
    setNewHeight(event.target.value);
    setMessage("");
  };

  const handleNewWeight = (event) => {
    setNewWeight(event.target.value);
    setMessage("");
  };

  return (
    <StepperWrapper>
      <Title>추가 정보 입력</Title>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length - 1 ? (
          <React.Fragment>
            <StepTitle>
              추가 정보 세팅이 완료되었습니다.
              <br />
              FINISH를 눌리고 서비스를 이용해보세요!
            </StepTitle>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                }}
              >
                Back
              </Button>
              <Box
                sx={{
                  flex: "1 1 auto",
                }}
              />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography
              sx={{
                mt: 2,
                mb: 1,
              }}
            >
              Step {activeStep + 1}
            </Typography>
            <InputWrapper>
              {activeStep === 0 && (
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          defaultValue={newGender}
                          onClick={handleNewGender}
                        >
                          <FormControlLabel
                            style={{ marginRight: "40px" }}
                            value="false"
                            control={<Radio />}
                            label="남자"
                          />
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="여자"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        label="Birthdate(YYYY-MM-DD)"
                        id="outlined-size-normal"
                        onChange={handleNewBirthday}
                        InputProps={{
                          style: { fontSize: 13 },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 13 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Message>{message}</Message>
                    </Grid>
                  </Grid>
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="height"
                        label="height"
                        name="height"
                        placeholder="160"
                        style={inputBox}
                        onChange={handleNewHeight}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="weight"
                        label="weight"
                        name="weight"
                        placeholder="55"
                        style={inputBox}
                        onChange={handleNewWeight}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Message>{message}</Message>
                    </Grid>
                  </Grid>
                </div>
              )}
            </InputWrapper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                }}
              >
                Back
              </Button>
              <Box
                sx={{
                  flex: "1 1 auto",
                }}
              />{" "}
              {isStepOptional(activeStep) && (
                <Button
                  color="inherit"
                  onClick={handleSkip}
                  sx={{
                    mr: 1,
                  }}
                >
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </StepperWrapper>
  );
}
