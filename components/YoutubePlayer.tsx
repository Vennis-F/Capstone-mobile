import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Orientation from 'react-native-orientation-locker';
export default function YoutubePlayer() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [fullScreen, setFullScreen] = React.useState(false);
        const FullScreen = () => {
        if(fullScreen){
            Orientation.lockToPortrait();
        } else{
            Orientation.lockToLandscape();
        }
        setFullScreen(!fullScreen)
    }
  return (
    <View style={styles.container}>
      <Video
        fullscreen = {fullScreen}
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 300,
    height: 500,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
