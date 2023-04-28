import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text, Grid, Button, Divider } from '@mantine/core';
import { ExternalLink, ArrowNarrowRight } from 'tabler-icons-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  
    headerTitle: {
      fontFamily: 'Inter Tight',
      fontSize: theme.fontSizes.xl,
      fontWeight: 400,
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

    subTitle: {
      fontFamily: "Space Mono",
    },

    greyBackground: {
      backgroundColor: theme.colors.gray[0],
    },

    imagesClass: {
      backgroundColor: theme.colors.gray[0],
      padding: 100,

      [BREAKPOINT]: {
        padding: 10,
        minHeight: 400,
      },
    },

}));

const AboutPage = () => {
    const { classes } = useStyles();
    
    return (
        <Container size="xl" px={30}>

          <Group mt={130} mb={170} position="center" align="center">
            <h1 className={classes.headerTitle} style={{ textAlign: "center"}}>
              Crafting a formula for designers to make deceptive interfaces.
            </h1>
          </Group>

          <Group position="center" className={classes.imagesClass}>
            <Image maw={800} src={"../img/summary.svg"} />
          </Group>

          <Stack mt={100} mb={100} align="center" w="100%">
            <Group maw={800}>
              <Text fz="xs" className={classes.subTitle}>About this study</Text>
              <Stack mt="auto" spacing={50}>
                  <Text fz="md">The Deceptive Interfaces Framework is an outcome of my thesis that focuses on exploring whether deception can be used as a strategy to influence behavior for altruistic outcomes, with a particular focus on the context of donations.</Text>
                  <Text fz="md">
                  The thesis includes conducting 12 experiments with different donation interfaces inspired by deceptive schemes. This is done to measure the levels of deception in each design, gathering feedback through qualitative and quantitative measurements, and distilling insights using a deception score formula.
                  </Text>
                  <Text fz="md">Learning from the success, limitations and how I made those interfaces, I lay out a framework that can help other designers create interfaces using deception. These interfaces could be more effective and yet socially acceptable.</Text>
              </Stack>
            </Group>
          </Stack>

          <Stack mb={100} align="center" w="100%">
            <Group maw={800}>
              <Text fz="xs" className={classes.subTitle}>Why Socially-Acceptable Deceptive Interfaces?</Text>
              <Stack mt="auto" spacing={50}>
                  <Text fz="md">I believe that socially-acceptable deceptive interfaces can be a powerful tool in helping designers know the influences of their interfaces.</Text>
                  <Text fz="md">By creating socially-acceptable deceptive interfaces, we can explore the balance between the benefits of deception and the need for transparency and ethical considerations. By doing so, he believes that interfaces that are both effective and trustworthy can be easily designed.</Text>
              </Stack>
            </Group>
          </Stack>

        </Container>
    )
}

export default AboutPage