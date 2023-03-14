import { createStyles, Container, Text, Button, Group, Select, Stack, Image, Badge } from '@mantine/core';
import { ArrowNarrowRight } from 'tabler-icons-react';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: 'Inter Tight',
    fontSize: '3rem',
    fontWeight: 400,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: "80%",

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
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  imageBorder: {
    height: 250,
    backgroundColor: theme.colors.gray[1],
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
      <Container className={classes.inner} px="xl" size="xl">

        <Stack mt={130} mb={170}>
          <h1 className={classes.title}>
            Make your donation interface more effective.
          </h1>
        </Stack>

        <Group grow mt={30} mb={100} position="left" align="flex-start">
          <Stack>
            <Group position="apart" align="end">
            <div>Your Design</div>
            <Badge color="gray" size="lg" radius="sm">+0% Participation</Badge>
            </Group>
           <div className={classes.imageBorder}>
           <Image maw={300} mx="auto" src={`../img/originalui.png`} alt="Random image"/>
           </div>
          </Stack>
          
          <Stack>
          <Group position="apart" align="end">
            <div>with strategy</div>
            <Badge color="gray" size="lg" radius="sm">+50% Participation</Badge>
          </Group>
          
           <div className={classes.imageBorder}>
           <Image maw={300} mx="auto" src={`../img/reachablegoalui.png`} alt="Random image"/>
           </div>
          </Stack>
        </Group>

      </Container>
    </div>
  );
}

export default HeroTitle;