import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Category } from '../../apis/category/types';
import { getCategories } from '../../apis/category/api';
import { COLORS } from '../../libs/const/color';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const IconArray = [
  <Ionicons name="color-palette" size={42} color={COLORS.MAINPINK} />,
  <FontAwesome5 name="paint-brush" size={38} color={COLORS.MAINPINK} />,
  <MaterialCommunityIcons name="draw-pen" size={48} color={COLORS.MAINPINK} />,
  <Ionicons name="image" size={42} color={COLORS.MAINPINK} />,
];

const Item = ({ item, onPress, index }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.icon}>{IconArray[index % 4]}</View>
    <Text numberOfLines={2} style={[styles.title]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleGetCategories = async () => {
    try {
      const catesRes = await getCategories('true');
      setCategories(catesRes);
    } catch (error) {
      console.log('[Categories - categories error] ', error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  const renderItem = ({ item, index }) => {
    return <Item item={item} index={index} onPress={() => {}} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    maxWidth: 80,
    marginRight: 24,
    alignItems: 'center',
  },
  title: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#00000014',
    borderRadius: 999,
    padding: 8,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Categories;
