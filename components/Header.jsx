import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Button, Image, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'

const HEADER_HEIGHT = 100;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    fontSize: theme.fontSizes.sm,
    textDecoration: 'none',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',

    [theme.fn.smallerThan('sm')]: {
        justifyContent: 'center',
      },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    paddingBottom: '10px',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontWeight: 500,
    marginRight: "20px",

    '&:hover': {
      borderBottom: `1px solid ${theme.colors.dark[9]}`,
      marginTop: "1px",
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    borderBottom: `1px solid ${theme.colors.dark[9]}`,
    marginTop: "1px",
  }

}));


const NavBarComponent = ({ links }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root} sx={{ borderBottom: 0 }}>
      <Container className={classes.header} size="xl" px={30}>
        <Flex       
          justify="flex-start"
          align="center"
          direction="row"
          style={{width: "100%"}}>
          <div>
            <Link href={`/`} style={{textDecoration: 'none', color: 'inherit', display: "Flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <Image maw="240px" mr="md" src="../img/logo-text.svg" alt="Logo" />
            </Link>
          </div>
          <div style={{flexGrow: '3'}}></div>
          <Group position="apart" className={classes.links}>
          {items}
          </Group>
        </Flex>


        

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>

      </Container>
    </Header>
  );
}

export default NavBarComponent;