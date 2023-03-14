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

      footer: {
        height: 200,
        paddingTop: 20,
      }

}));
  
const Footer = () => {
    const { classes } = useStyles();

    return(
        <div className={classes.wrapper}>
            <div className={classes.root}>
                <Group className={classes.footer} position="flex-start" align="flex-start">
                    <div style={{flexGrow: 3}}>interface.tools is a collection of tools to help designers design better interfaces.</div>
                    <Stack>
                        Made by Yuan Jie
                    </Stack>
                </Group>
            </div>
        </div>

    )
}

export default Footer;