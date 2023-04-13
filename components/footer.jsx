import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white,
        marginTop: 300,
      },

      root: {
        position: 'relative',
        zIndex: 1,
        fontSize: theme.fontSizes.xs,
      },

      alternateText: {
        fontFamily: "Space Mono",
      },

      footer: {
        height: 200,
        paddingTop: 20,
      }

}));
  
const Footer = () => {
    const { classes } = useStyles();

    return(
        <Container size="xl" px={30}>
            <div className={classes.wrapper}>
                <div className={classes.root}>
                    <Group className={classes.footer} position="flex-start" align="flex-start">
                        <div style={{flexGrow: 3}} className={classes.alternateText}>
                        Interface.tools help designers create socially-acceptable interfaces that leverages on deception.
                            </div>
                        <Stack>
                            <Text fz="xs" className={classes.alternateText}>Made by Yuan Jie</Text>
                        </Stack>
                    </Group>
                </div>
            </div>
        </Container>

    )
}

export default Footer;