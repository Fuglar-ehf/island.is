import React from 'react'
import {
  Box,
  FormStepper as IslandUIFormStepper,
  FormStepperSection,
  Stack,
  Typography,
} from '@island.is/island-ui/core'

interface ProcessProps {
  title: string
  sections: FormStepperSection[]
  activeSection: number
  activeCar?: string
}

const FormStepper = ({
  title,
  sections,
  activeSection,
  activeCar,
}: ProcessProps) => (
  <Box padding={4}>
    <Stack space={4}>
      <Box>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="intro">{activeCar}</Typography>
        <Typography variant="intro">{`Step ${activeSection + 1} out of ${
          sections.length
        }`}</Typography>
      </Box>
      <IslandUIFormStepper sections={sections} activeSection={activeSection} />
    </Stack>
  </Box>
)

export default FormStepper
