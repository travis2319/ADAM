import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const InsuranceDetailsCard = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Insurance details</Text>
      <View style={[styles.card, { width: screenWidth - 40 }]}>
        <Text style={styles.label}>Insurance Company Name</Text>
        <Text style={styles.companyName}>
          The New India Assurance Company Limited
        </Text>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.smallLabel}>Insurance effective</Text>
            <Text style={styles.value}>04-Nov-2024</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.smallLabel}>Insurance expiry</Text>
            <Text style={styles.value}>04-Jan-2026</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Text style={styles.smallLabel}>Insurance policy No.</Text>
          <Text style={styles.value}>123x 456x 789xx</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F5F9FF',
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF4D2',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  companyName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  smallLabel: {
    fontSize: 12,
    color: '#777',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginTop: 6,
  },
});

export default InsuranceDetailsCard;
