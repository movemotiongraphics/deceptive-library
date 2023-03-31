import { createStyles, Container, Text, Button, Group, Select, Stack, Image, Badge } from '@mantine/core';
import { useState } from 'react';
import { RiveAnimation, CurrentDonationAmount } from './riveDonate';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
  },

  title: {
    fontFamily: 'Inter Tight',
    fontSize: theme.fontSizes.xl,
    fontWeight: 500,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: "80%",
    lineHeight: 1.1,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,

    [BREAKPOINT]: {
      height: 54,
      flex: 1,
    },
  },

  imageBorder: {
    height: 500,
    backgroundColor: theme.colors.gray[1],
    objectFit: "cover",
  },

  highlightedText: {
    textTransform: "none",
    fontWeight: "inherit",
    fontSize: "inherit",

  },

  subheader: {
    fontWeight: 500,
  }
}));

const HeroTitle = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner} fluid px={0}>

        <Stack mt={130} mb={170}>
          <h1 className={classes.title}>
            Let's make your donation interface more effective with human biases.
          </h1>
        </Stack>

        <Group grow mt={30} position="left" align="flex-start">
          <Stack>
            <Group position="apart" align="end">
            <Text fz="sm" >This might be your current design,</Text>
            <Badge color="gray" size="lg" radius="sm">+0% Participation</Badge>
            </Group>
           <div className={classes.imageBorder}>
            {/* rive animation here */}
            <RiveAnimation scenarioNumber={99} />
           </div>
          </Stack>
          
          <Stack>
          <Group position="apart" align="end">
          <Text fz="sm">but these might be better.</Text>
            <Badge color="green" size="lg" radius="sm">+50% Participation</Badge>
          </Group>
          
           <div className={classes.imageBorder}>
            <RiveAnimation scenarioNumber={2} />
           </div>
          </Stack>
        </Group>

      </Container>
    </div>
  );
}

export default HeroTitle;