export default () => ({
    broker: process.env.BROKER ?? 'broker:9092',
    services: {
      production: {
        clientId: 'production-client',
        groupId: 'production-consumer',
        name: 'production-kafka-client',
      },
      payment: {
        clientId: 'payment-client',
        groupId: 'payment-consumer',
        name: 'payment-kafka-client',
      },
    },
  });