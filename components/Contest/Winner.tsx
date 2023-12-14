import { View, Text, Image, StyleSheet } from 'react-native';
import { getWinners } from '../../apis/contest/api';
import { useState, useCallback } from 'react';
import { ViewWinner } from '../../apis/contest/types';
import { useFocusEffect } from 'expo-router';
import { getImage } from '../../apis/image/components/apis';
import { COLORS } from '../../libs/const/color';

const WinnerBoard = ({ winner, top }: { winner: ViewWinner; top: number }) => {
  return (
    <View style={[styles.boards, top === 1 && styles.leader]}>
      <Image
        style={[styles.image, top === 1 && styles.leaderImage]}
        source={{ uri: getImage(winner.imageUrl) }}
      />
      <Text style={[styles.name, top === 1 && styles.leaderName]}>
        {winner.winnerName}
      </Text>
      <View style={[styles.circle, top === 1 && styles.leaderCircle]}>
        <Text style={[styles.position, top === 1 && styles.leaderPosition]}>
          {winner.position}
        </Text>
      </View>
    </View>
  );
};

const Winner = ({ contestId }) => {
  const [winners, setWinners] = useState<ViewWinner[]>([]);

  const handelGetWinner = async () => {
    try {
      setWinners(await getWinners(contestId));
    } catch (error) {
      console.log('[Winner - get winner error] ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handelGetWinner();
    }, [contestId])
  );
  console.log(winners);
  return (
    <View style={styles.container}>
      {winners.length >= 1 && (
        <View style={styles.winnerBoard}>
          {winners.length >= 3 && <WinnerBoard winner={winners[2]} top={3} />}
          <WinnerBoard winner={winners[0]} top={1} />
          {winners.length >= 2 && <WinnerBoard winner={winners[1]} top={2} />}
        </View>
      )}
    </View>
  );
};

export default Winner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
  },
  winnerBoard: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  boards: {
    width: '30%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.MAINPINKBLUR,
    borderRadius: 24,
    height: 190,
    position: 'relative',
  },
  leader: {
    width: '33%',
    height: 200,
  },
  image: {
    borderRadius: 60,
    height: 84,
    width: 84,
  },
  leaderImage: {
    height: 98,
    width: 98,
  },
  name: {
    color: COLORS.MAINPINK,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 4,
  },
  leaderName: {
    fontSize: 15,
  },
  circle: {
    backgroundColor: COLORS.MAINPINK,
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -16,
  },
  leaderCircle: {
    width: 42,
    height: 42,
  },
  position: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  leaderPosition: {
    fontSize: 16,
  },
});
