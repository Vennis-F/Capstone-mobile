import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, View } from 'react-native';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating === 0) {
      stars.push(<Icon name="star" size={15} color={'#3f3f3f46'} />);
    } else if (i <= rating) {
      stars.push(<Icon name="star" size={15} color={'#FFE234'} />);
    } else {
      stars.push(<Icon name="star" size={15} color={'#3f3f3f46'} />);
    }
  }

  return <View style={styles.ratedStars}>{stars}</View>;
};

const styles = StyleSheet.create({
  ratedStars: {
    flexDirection: 'row',
    marginVertical: 4,
  },
});

export default StarRating;
