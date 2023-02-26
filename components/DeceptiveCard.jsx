import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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

    container: {
      minHeight: 400,
    }

}));
  
const DeceptiveCard = ({ id, fields }) => {
    const { classes } = useStyles();
    const humanBiases = fields["Human Bias"]

    return(
      <Container size={300} px={0} className={classes.container}>
        <Card withBorder p="lg" className={classes.card}>
          <Card.Section>
            <Image src={fields.Thumbnail} alt={id} height={300} className={classes.thumbnailImage}/>
          </Card.Section>
    
          <Group position="apart" mt="xl">
            <Text size="sm" weight={700} className={classes.title}>
              {fields.Scenario}
            </Text>
          </Group>
          <Text mt="sm" mb="md" color="dimmed" size="xs">
            {fields.Description}
          </Text>

          <Group position="apart" mt="xl">
            <Badge size="sm">{humanBiases ? humanBiases.length : 'No' } Deceptive Techniques</Badge>
          </Group>

          <Stack>
            { humanBiases ? humanBiases.map((e, i) => {
              <Badge size="sm">{e}</Badge>
            }) : 'no' }  
          </Stack>          
        </Card>
      </Container>

    )
}

export default DeceptiveCard;