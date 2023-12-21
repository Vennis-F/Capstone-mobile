import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getCategories } from '../apis/category/api';
import { Category } from '../apis/category/types';
import { COLORS } from '../libs/const/color';
import { Button, Checkbox, Select } from 'native-base';
import { Level } from '../apis/level/types';
import { getLevels } from '../apis/level/api';

const FilterTable = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCatefories] = useState<string[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const PRICE_ASC = JSON.stringify({ sortField: 'price', order: 'ASC' });
  const PRICE_DESC = JSON.stringify({ sortField: 'price', order: 'DESC' });
  const DATE_ASC = JSON.stringify({ sortField: 'publishedDate', order: 'ASC' });
  const DATE_DESC = JSON.stringify({
    sortField: 'publishedDate',
    order: 'DESC',
  });
  const [sort, setSort] = useState(DATE_ASC);

  const handleGetCategories = async () => {
    try {
      setCategories(await getCategories('true'));
    } catch (error) {
      console.log('[FilterTable - get categories error] ', error);
    }
  };

  const handleGetLevels = async () => {
    try {
      setLevels(await getLevels('true'));
    } catch (error) {
      console.log('[FilterTable - get level error] ', error);
    }
  };

  const handlePressCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      const result = selectedCategories.filter((category) => {
        return category !== id;
      });
      setSelectedCatefories(result);
    } else setSelectedCatefories([...selectedCategories, id]);
  };

  const handlePressLevel = (id: string) => {
    if (selectedLevels.includes(id)) {
      const result = selectedLevels.filter((level) => {
        return level !== id;
      });
      setSelectedLevels(result);
    } else setSelectedLevels([...selectedLevels, id]);
  };

  const handleReset = () => {
    setSelectedCatefories([]);
    setSelectedLevels([]);
    setSort(DATE_DESC);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetCategories();
      handleGetLevels();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate('courseList')}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={'#000'}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.title}>Bộ lọc</Text>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.title}>Thể loại</Text>
        <View style={styles.categories}>
          {categories.length >= 1 ? (
            <FlatList
              data={categories}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={[styles.category]}
                  onPress={() => {
                    handlePressCategory(item.id);
                  }}
                >
                  <Text numberOfLines={2} style={[styles.categoryName]}>
                    {item.name}
                  </Text>
                  <Checkbox
                    isChecked={selectedCategories.includes(item.id)}
                    isReadOnly={true}
                    value="test"
                    aria-label="test"
                    colorScheme="blue"
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            ''
          )}
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.title}>Cấp độ</Text>
        <View style={styles.categories}>
          {levels.length >= 1 ? (
            <FlatList
              data={levels}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.category]}
                  onPress={() => {
                    handlePressLevel(item.id);
                  }}
                >
                  <Text numberOfLines={2} style={[styles.categoryName]}>
                    {item.name}
                  </Text>
                  <Checkbox
                    isChecked={selectedLevels.includes(item.id)}
                    isReadOnly={true}
                    value="test"
                    aria-label="test"
                    colorScheme="orange"
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            ''
          )}
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={[styles.title, { marginBottom: 12 }]}>Sắp xếp theo</Text>
        <Select
          width={180}
          placeholder="Sắp xếp theo"
          marginLeft={2}
          selectedValue={sort}
          onValueChange={(value) => {
            setSort(value);
          }}
        >
          <Select.Item label="Mới nhất" value={DATE_DESC} />
          <Select.Item label="Cũ nhất" value={DATE_ASC} />
          <Select.Item label="Giá cao đến thấp" value={PRICE_DESC} />
          <Select.Item label="Giá thấp đến cao" value={PRICE_ASC} />
        </Select>
      </View>

      <View style={styles.controlBar}>
        <Button
          style={[styles.button, styles.reset]}
          onPress={() => {
            handleReset();
          }}
        >
          <Text style={styles.buttonText}>Đặt lại</Text>
        </Button>
        <Button
          style={[styles.button, styles.apply]}
          onPress={() => {
            navigation.navigate('courseList', {
              selectedCategories: selectedCategories,
              selectedLevels: selectedLevels,
              sort: JSON.parse(sort),
            });
          }}
        >
          <Text style={styles.buttonText}>Áp dụng</Text>
        </Button>
      </View>
    </View>
  );
};

export default FilterTable;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
  },
  icons: {
    borderWidth: 1,
    borderColor: '#0000004a',
    borderRadius: 99,
    backgroundColor: '#ffffffdf',
    padding: 4,
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    alignSelf: 'center',
    width: '70%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginTop: 24,
  },
  categories: {},
  category: {
    maxWidth: '100%',
    marginRight: 18,
    padding: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryName: {
    fontSize: 16,
  },
  selected: {
    backgroundColor: COLORS.MAINPINK,
    color: '#fff',
  },
  controlBar: {
    marginTop: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 180,
    height: 50,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  reset: {
    backgroundColor: 'teal',
  },
  apply: {
    backgroundColor: COLORS.MAINPINK,
  },
});
