import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text } from '@mantine/core';

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

}));

const StudyPage = () => {
  const { classes } = useStyles();

    return (
      <Container size="xl" px={30}>
          <Group>
            <h1 className={classes.title}>How were the experiments done?</h1>
          </Group>
      </Container>
    )
}

export default StudyPage