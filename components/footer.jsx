import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';
import { BrandTwitter, Mail } from 'tabler-icons-react';

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
      },

      yjButton: {
        backgroundColor: theme.colors.grape[0],
        padding: 5,
        borderRadius: 5,
      },

}));
  
const Footer = () => {
    const { classes } = useStyles();

    return(
        <Container size="xl" px={30}>
            <div className={classes.wrapper}>
                <div className={classes.root}>
                    <Group className={classes.footer} position="apart" align="flex-start">
                        <div style={{flexGrow: 3}}>
                        <Text fz="xs" className={classes.alternateText} maw={500}>The Deceptive Interfaces Framework help designers create socially-acceptable interfaces using human biases, inspired from deception.</Text></div>
                        <Stack>
                            <Text fz="xs" className={classes.alternateText}>Made by <a className={classes.yjButton} style={{ textDecoration: "none", color: "inherit" }}href="https://yuanjie.info/">Yuan Jie</a></Text>
                            <Group>
                            <a href="https://yuanjie.info/"><Mail color={"black"} strokeWidth={1}/></a>
                            <a href="https://twitter.com/quietcomputers"><BrandTwitter color={'black'} strokeWidth={1}/></a>
                            </Group>
                        </Stack>
                    </Group>
                </div>
            </div>
        </Container>

    )
}

export default Footer;