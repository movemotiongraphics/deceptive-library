import { createStyles, Container, Text, Button, Group, Select, Stack, Image, Badge, Grid } from '@mantine/core';
import { useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';
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
    textAlign: 'center',
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

  alternateText: {
    fontFamily: "Space Mono",
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
    borderRadius: 20,

    [BREAKPOINT]: {
      height: 350,
    },
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

  const handleScroll = (id) => {
    if (typeof document !== 'undefined') {
    const part1 = document.querySelector(id);
    part1.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner} fluid px={0}>

        <Group mt={130} mb={50} position="center" alignItems="center">
          <h1 className={classes.title}>
            A set of tools for designers to create more effective donation interfaces, using deception.
          </h1>
        </Group>
        <Group position="center"  mb={170}>
            <a onClick={() => handleScroll("#preface")}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="dark" variant="subtle" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>go to framework</Button>
            </a>
            {/* <a href={"./outcomes"}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="gray" variant="subtle" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>insights</Button>
            </a>
            <a href={"./chart"}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="gray" variant="subtle" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>strategies</Button>
            </a> */}
        </Group>

        <Grid mt={30} position="left" align="flex-start">
          <Grid.Col md={6} sm={12} xs={12}>
            <Stack>
              <Group position="apart" align="end">
              <Text fz="sm">This is your current design,</Text>
              <Badge color="gray" size="md" radius="sm" className={classes.alternateText}>+0% clicked donate</Badge>
              </Group>
            <div className={classes.imageBorder}>
              {/* rive animation here */}
              <RiveAnimation scenarioNumber={99} />
            </div>
            </Stack>
          </Grid.Col>

          <Grid.Col md={6} sm={12} xs={12}>
            <Stack>
            <Group position="apart" align="end">
            <Text fz="sm">but with a deceptive strategy, it might be better.</Text>
              <Badge color="green" size="md" radius="sm" className={classes.alternateText} >+50% clicked donate</Badge>
            </Group>
            
            <div className={classes.imageBorder}>
              <RiveAnimation scenarioNumber={2} />
            </div>
            </Stack>
          </Grid.Col>
        </Grid>

      </Container>
    </div>
  );
}

export default HeroTitle;