import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      minHeight: 300,
    },
  
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    },
  
    title: {
      lineHeight: 1,
    },

    thumbnailImage: {
      objectFit: 'contain',
      objectPosition: 'top',
    },

}));
  
const InsightCard = ({ insight }) => {
    const { classes } = useStyles();

    return(
      <Container size={300} px={0} className={classes.container}>
        <Card withBorder p="lg" className={classes.card}>
    
          <Group position="apart">
            <Text size="xl" weight={300}>
              {insight}
            </Text>
          </Group>
          <Text mt="sm" mb="md" color="dimmed" size="xs">
          </Text>     
        </Card>
      </Container>

    )
}

export default InsightCard;