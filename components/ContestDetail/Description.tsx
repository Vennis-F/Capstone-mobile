import { View, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';
import { formatStringtoDate } from '../../libs/core/handle-time';

const Description = ({ contest }) => {
  return (
    <View style={{ marginTop: 12 }}>
      <View style={styles.requireContainer}>
        <Text style={styles.requireTitle}>Phần thưởng</Text>
        <HTML
          source={{ html: contest.prize }}
          contentWidth={300}
          tagsStyles={{
            h2: {
              fontSize: 16,
              paddingHorizontal: 8,
              fontStyle: 'italic',
              lineHeight: 24,
            },
            strong: {
              fontWeight: '500',
            },
            p: {
              fontSize: 16,
              paddingHorizontal: 8,
              fontStyle: 'italic',
              lineHeight: 24,
            },
          }}
        />
      </View>

      <View style={styles.requireContainer}>
        <Text style={styles.requireTitle}>Thời gian thi</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 12,
          }}
        >
          <View>
            <Text style={{ color: 'grey' }}>Ngày bắt đầu</Text>
            <Text style={{ fontWeight: '600' }}>
              {formatStringtoDate(contest.startedDate)}
            </Text>
          </View>
          <View>
            <Text style={{ color: 'grey' }}>Ngày kết thúc</Text>
            <Text style={{ fontWeight: '600' }}>
              {formatStringtoDate(contest.expiredDate)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.requireContainer}>
        <Text style={styles.requireTitle}>Miêu tả</Text>
        <HTML
          source={{ html: contest.description }}
          contentWidth={300}
          tagsStyles={{
            h2: {
              fontSize: 16,
              paddingHorizontal: 8,
              fontStyle: 'italic',
              lineHeight: 24,
            },
            strong: {
              fontWeight: '500',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requireContainer: {
    marginBottom: 12,
  },
  requireTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Description;
