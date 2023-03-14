import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text } from '@mantine/core';

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

const AboutPage = () => {
    return (
        <>About Me
        </>
    )
}

export default AboutPage