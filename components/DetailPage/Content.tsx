import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { secondsToMinutesString } from '../../libs/core/handle-time';
import { Ionicons } from '@expo/vector-icons';

const Content = ({ course, chapterLectures }) => {
  return (
    <View>
      <View style={{ marginTop: 12 }}>
        <Text style={styles.contentTitle}>Khóa học này bao gồm</Text>
        <View style={styles.containerSub}>
          <Icon name="access-time" size={24} />
          <Text style={styles.containerText}>
            {Math.round(course.totalLength / 60)} giờ video theo yêu cầu
          </Text>
        </View>
        <View style={styles.containerSub}>
          <Icon name="tv" size={24} />
          <Text style={styles.containerText}>
            {course.totalChapter} video bài giảng
          </Text>
        </View>
        <View style={styles.containerSub}>
          <Icon name="phone-iphone" size={24} />
          <Text style={styles.containerText}>
            Truy cập trên thiết bị di động và máy tính
          </Text>
        </View>
        <View style={styles.containerSub}>
          <Ionicons name="infinite" size={24} />
          <Text style={styles.containerText}>Quyền truy cập suốt đời</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.contentTitle}>
          Nội dung khóa học {`(${course.totalChapter})`}
        </Text>
        {chapterLectures.map((chapter, index) => (
          <TouchableOpacity key={index} onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.indexContainer}>
                <Text style={styles.index}>
                  {index < 9 ? `0${index + 1}` : index}
                </Text>
              </View>
              <View style={styles.chapterTitle}>
                <Text numberOfLines={1} style={styles.text}>
                  {chapter.title}
                </Text>
                <Text style={styles.time}>
                  {secondsToMinutesString(chapter.totalContentLength)}
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name="play-circle" size={36} color="#4088ed" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  container: {
    width: '96%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#00000046',
    borderRadius: 80,
  },
  indexContainer: {
    padding: 4,
    backgroundColor: '#d9e9ff',
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4088ed',
  },
  chapterTitle: {
    maxWidth: '68%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: 'grey',
  },
  icon: {
    marginLeft: 'auto',
  },
  containerSub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginBottom: 12,
    alignItems: 'center',
    maxWidth: '80%',
  },
  containerText: {
    fontSize: 18,
    color: '#808080',
    marginLeft: 20,
  },
});

export default Content;
