import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text, Grid } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  
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

  headerTitle: {
    fontFamily: 'Inter Tight',
    fontSize: theme.fontSizes.xl,
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

  subTitle: {
    fontFamily: "Space Mono",
  },

  greyBackground: {
    backgroundColor: theme.colors.gray[2],
  },
  
  greyBackgroundAlternate: {
    backgroundColor: theme.colors.gray[0],
  }

}));

const ChartsPage = () => {
  const { classes } = useStyles();

    return (
      <Container size="xl" px={30}>
          <Group mt={130} mb={170} position="center" alignItems="center">
            <h1 className={classes.headerTitle} style={{ textAlign: "center"}}>
              Get inspired by the insights from the study.
            </h1>
          </Group>

          <Stack spacing={20} mt={20}>
            <Stack>
              <Stack className={classes.greyBackground} position="left" align="flex-start" mih={700} p={50}>
              <Text fz="xs" className={classes.subTitle} grow>Your Cards</Text>
              <h1 className={classes.title}>The deceptive interfaces framework helps designers to design effective choices with 4 steps.</h1>
              <Grid mt="auto">
                <Grid.Col span={6}><Text fz="sm" mb={0}>This set of instruction consists of four libraries that are designed to be considered in sequence. You can visit each of them by clicking on it here, or follow the guide to make your own deceptive interface.</Text></Grid.Col>
              </Grid>
              </Stack>
            </Stack>
          </Stack>
      </Container>
    )
}

export default ChartsPage