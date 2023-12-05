import { View, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

const Description = ({ course }) => {
  return (
    <View>
      <View style={styles.requireContainer}>
        <Text style={styles.requireTitle}>Miêu tả</Text>
        <HTML
          source={{ html: course.description }}
          contentWidth={300}
          tagsStyles={{
            p: {
              fontSize: 16,
              paddingHorizontal: 8,
              fontStyle: 'italic',
            }, // ví dụ: kiểu dáng cho thẻ p (đoạn văn bản)
          }}
        />
      </View>

      <View style={styles.requireContainer}>
        <Text style={styles.requireTitle}>Yêu cầu</Text>
        <HTML
          source={{ html: course.prepareMaterial }}
          contentWidth={300}
          tagsStyles={{
            li: {
              fontSize: 16,
              fontStyle: 'italic',
              marginBottom: 4,
            },
            p: {
              fontSize: 16,
              paddingHorizontal: 8,
              fontStyle: 'italic',
            },
            // ví dụ: kiểu dáng cho thẻ p (đoạn văn bản)
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requireContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  requireTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Description;
