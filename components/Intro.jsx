import { createStyles, Container, Text, Button, Group, Select, Stack } from '@mantine/core';

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
    fontSize: 62,
    fontWeight: 600,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

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

  subheader: {
    fontWeight: 500,
  }
}));

const HeroTitle = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner} px={0}>

        <Stack mt={130}>
          <Text mx={0} fw={600}>
            Hey,
          </Text>
          <h1 className={classes.title}>
            Are you designing choices?
          </h1>
        </Stack>

        <Group grow mt={100} mb={300} position="left" align="flex-start">
          <Stack>
            <Text mx={0} fw={600}>
              Yes
            </Text>
            <Text className={classes.description}>
              <p>Designing choices can be difficult, especially when you just want to focus on the content. This library helps translate complex psychological choice architecture theories into UI components.</p>
              </Text>

              <Text className={classes.description}>
              <p>With this library, you can think about the outcome you want, and we will tell you how to build the most effective choice design.</p>
              </Text>

              <Text fz="md" fw="600">Use</Text>
              <Text><h2 className={classes.subheader}>I want to make my choices</h2></Text>
              <Select
              sx={{ width: 300 }}
              size="lg"
              placeholder="Pick one"
              data={[
                { value: '1', label: 'Influence more people to donate' },
                { value: '2', label: 'Increase donation amount.' },
                { value: '3', label: 'Easy to use, yet efficient.' },
                { value: '4', label: 'Remove user’s suspicion in your donation scheme.' },
                { value: '5', label: 'More trustworthy, to increase users confidence..' },
              ]}
              />
          </Stack>

          <Stack>
            <Text mx={0} fw={600}>
              No...
            </Text>
            <Text className={classes.description}>
              <p>“Shady” and acceptability. What makes a “shady” choice design?</p>
              </Text>

              <Text fz="md" fw="600">Learn</Text>
              <Text>
              <h2 className={classes.subheader}>Learn how to use a strategy</h2>
              </Text>

              <Select
                sx={{ width: 300 }}
                size="lg"
                placeholder="Pick one"
                data={[
                  { value: '1', label: 'Influence more people to donate' },
                  { value: '2', label: 'Increase donation amount.' },
                  { value: '3', label: 'Easy to use, yet efficient.' },
                  { value: '4', label: 'Remove user’s suspicion in your donation scheme.' },
                  { value: '5', label: 'More trustworthy, to increase users confidence..' },
                ]}
              />
          </Stack>
          

        </Group>

        {/* <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            radius="xl"
          >
            What are deceptive interfaces?
          </Button>

        </Group> */}
      </Container>
    </div>
  );
}

export default HeroTitle;