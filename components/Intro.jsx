import { createStyles, Container, Text, Button, Group, Select } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    height: '60vh',

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: 'Inter Tight',
    fontSize: 62,
    fontWeight: 600,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,

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
}));

const HeroTitle = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner} px={0}>

        <Group mb={20}>
          <h1 className={classes.title}>
            Are you designing choices?
          </h1>
        </Group>

        <Group>
          
          <Text 
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
           <h2>I am designing for</h2>
          </Text>

          <Select
            placeholder="Pick one"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />

          <Text 
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
           <h2>. I want to make my interface</h2>
          </Text>

          <Select
            placeholder="Pick one"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Group>

        <Text className={classes.description} color="dimmed">
          <h3>Welcome to the Deceptive Interface Library. Deception is everywhere, learn how to use them in your interfaces to influence behaviour.</h3>
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            radius="xl"
          >
            What are deceptive interfaces?
          </Button>

        </Group>
      </Container>
    </div>
  );
}

export default HeroTitle;