import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  GestureResponderEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

interface FoodItem {
  name: string;
  calories: number;
}

const CalorieCounterApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [calories, setCalories] = useState<number>(0);
  const [consumedFoods, setConsumedFoods] = useState<FoodItem[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [customFoodName, setCustomFoodName] = useState<string>('');
  const [customFoodCalories, setCustomFoodCalories] = useState<string>('');

  const foodList: FoodItem[] = [
    { name: 'Apple', calories: 95 },
    { name: 'Banana', calories: 105 },
    { name: 'Orange', calories: 62 },
    { name: 'Rice (1 cup)', calories: 200 },
    { name: 'Chicken Breast (100g)', calories: 165 },
    { name: 'Egg (1 large)', calories: 78 },
    { name: 'Bread (1 slice)', calories: 80 },
    { name: 'Milk (1 cup)', calories: 150 },
    { name: 'Cheese (1 slice)', calories: 113 },
    { name: 'Butter (1 tbsp)', calories: 102 },
    { name: 'Roti (1 piece)', calories: 120 },
    { name: 'Dal (1 cup)', calories: 198 },
    { name: 'Paneer (100g)', calories: 265 },
    { name: 'Chole (1 cup)', calories: 250 },
    { name: 'Rajma (1 cup)', calories: 215 },
    { name: 'Samosa (1 piece)', calories: 262 },
    { name: 'Pakora (1 piece)', calories: 75 },
    { name: 'Paratha (1 piece)', calories: 210 },
    { name: 'Dosa (1 piece)', calories: 168 },
    { name: 'Idli (1 piece)', calories: 39 },
    { name: 'Upma (1 cup)', calories: 150 },
    { name: 'Poha (1 cup)', calories: 130 },
    { name: 'Pav Bhaji (1 serving)', calories: 400 },
    { name: 'Vada Pav (1 piece)', calories: 300 },
    { name: 'Biryani (1 cup)', calories: 290 },
    { name: 'Kheer (1 cup)', calories: 220 },
    { name: 'Halwa (1 serving)', calories: 300 },
    { name: 'Lassi (1 glass)', calories: 260 },
    { name: 'Butter Chicken (1 cup)', calories: 490 },
    { name: 'Tandoori Chicken (100g)', calories: 230 },
    { name: 'Bhindi Masala (1 cup)', calories: 120 },
    { name: 'Aloo Gobi (1 cup)', calories: 150 },
    { name: 'Baingan Bharta (1 cup)', calories: 130 },
    { name: 'Matar Paneer (1 cup)', calories: 240 },
    { name: 'Palak Paneer (1 cup)', calories: 230 },
    { name: 'Sambar (1 cup)', calories: 130 },
    { name: 'Rasam (1 cup)', calories: 60 },
    { name: 'Fish Curry (1 cup)', calories: 180 },
    { name: 'Prawn Curry (1 cup)', calories: 200 },
    { name: 'Masala Dosa (1 piece)', calories: 240 },
    { name: 'Aloo Paratha (1 piece)', calories: 220 },
    { name: 'Gulab Jamun (1 piece)', calories: 150 },
    { name: 'Jalebi (1 piece)', calories: 120 },
    { name: 'Pani Puri (1 serving)', calories: 150 },
    { name: 'Bhel Puri (1 serving)', calories: 200 },
    { name: 'Sev Puri (1 serving)', calories: 240 },
    { name: 'Dhokla (1 piece)', calories: 50 },
    { name: 'Kachori (1 piece)', calories: 200 },
    { name: 'Misal Pav (1 serving)', calories: 400 },
    { name: 'Thalipeeth (1 piece)', calories: 150 },
    { name: 'Thepla (1 piece)', calories: 120 },
    { name: 'Khichdi (1 cup)', calories: 200 },
    { name: 'Shrikhand (1 cup)', calories: 210 },
    { name: 'Modak (1 piece)', calories: 130 },
    { name: 'Sheera (1 serving)', calories: 250 },
    { name: 'Chutney (1 tbsp)', calories: 30 },
    { name: 'Pickle (1 tbsp)', calories: 40 },
    { name: 'Litti Chokha (1 serving)', calories: 300 },
    { name: 'Malai Kofta (1 cup)', calories: 300 },
    { name: 'Aloo Tikki (1 piece)', calories: 150 },
    { name: 'Chaat (1 serving)', calories: 250 },
    { name: 'Keema (1 cup)', calories: 300 },
    { name: 'Naan (1 piece)', calories: 260 },
    { name: 'Kulcha (1 piece)', calories: 220 },
    { name: 'Bhature (1 piece)', calories: 290 },
    { name: 'Puri (1 piece)', calories: 150 },
    { name: 'Coconut Chutney (1 tbsp)', calories: 50 },
    { name: 'Raita (1 cup)', calories: 100 },
    { name: 'Vegetable Pulao (1 cup)', calories: 200 },
    { name: 'Chicken Tikka (100g)', calories: 250 },
    { name: 'Paneer Tikka (100g)', calories: 270 },
    { name: 'Egg Curry (1 cup)', calories: 250 },
    { name: 'Mango Lassi (1 glass)', calories: 300 },
    { name: 'Besan Ladoo (1 piece)', calories: 120 },
    { name: 'Rasgulla (1 piece)', calories: 120 },
    { name: 'Nankhatai (1 piece)', calories: 60 },
    { name: 'Murukku (1 piece)', calories: 50 },
    { name: 'Chakli (1 piece)', calories: 50 },
    { name: 'Appam (1 piece)', calories: 120 },
    { name: 'Puttu (1 piece)', calories: 150 },
    { name: 'Kozhukattai (1 piece)', calories: 130 },
    { name: 'Kadhi (1 cup)', calories: 180 },
    { name: 'Zunka (1 cup)', calories: 180 },
    { name: 'Pitla (1 cup)', calories: 160 },
    { name: 'Sabudana Khichdi (1 cup)', calories: 220 },
    { name: 'Sabudana Vada (1 piece)', calories: 150 },
    { name: 'Dahi Vada (1 piece)', calories: 150 },
    { name: 'Chana Masala (1 cup)', calories: 250 },
    { name: 'Chicken Korma (1 cup)', calories: 300 },
    { name: 'Mutton Curry (1 cup)', calories: 350 },
    { name: 'Vegetable Curry (1 cup)', calories: 200 },
    { name: 'Banana Chips (1 serving)', calories: 150 },
    { name: 'Payasam (1 cup)', calories: 250 },
    { name: 'Kulfi (1 piece)', calories: 200 },
    { name: 'Chikki (1 piece)', calories: 150 },
    { name: 'Gajar Halwa (1 serving)', calories: 280 },
    { name: 'Makki Ki Roti (1 piece)', calories: 150 },
    { name: 'Sarson Ka Saag (1 cup)', calories: 180 },
    { name: 'Gujarati Kadhi (1 cup)', calories: 160 },
    { name: 'Aamras (1 cup)', calories: 150 },
    { name: 'Methi Thepla (1 piece)', calories: 120 },
    { name: 'Veg Hakka Noodles (1 cup)', calories: 200 },
    { name: 'Tamarind Rice (1 cup)', calories: 180 }
  ];

  const handleSearch = (text: string): void => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredFoods([]);
      setDropdownVisible(false);
      return;
    }
    const filtered = foodList.filter((food) =>
      food.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFoods(filtered);
    setDropdownVisible(filtered.length > 0);
  };

  const handleFoodSelect = (item: FoodItem): void => {
    setConsumedFoods((prevFoods) => [...prevFoods, item]);
    setCalories((prevCalories) => prevCalories + item.calories);
    setSearchQuery('');
    setFilteredFoods([]);
    setDropdownVisible(false);
  };

  const addCustomFood = (): void => {
    if (!customFoodName.trim() || !customFoodCalories.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    const customFood: FoodItem = {
      name: customFoodName.trim(),
      calories: parseInt(customFoodCalories.trim(), 10),
    };
    setConsumedFoods((prevFoods) => [...prevFoods, customFood]);
    setCalories((prevCalories) => prevCalories + customFood.calories);
    setCustomFoodName('');
    setCustomFoodCalories('');
    setModalVisible(false);
  };

  const clearAllFoods = (): void => {
    setConsumedFoods([]);
    setCalories(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calorie Counter</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Icon name="add-circle" size={40} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        Search for customized food that are not available in the list over interned and click the green plus icon to add them on the consumed food list
      </Text>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.foodItem} onPress={() => handleFoodSelect(item)}>
                <Text style={styles.foodItemText}>
                  {item.name} - {item.calories} cal
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <View style={styles.calorieSection}>
        <Text style={styles.calorieLabel}>Total Calories:</Text>
        <Text style={styles.calorieValue}>{calories} cal</Text>
      </View>

      <View style={styles.consumedFoodsContainer}>
        <View style={styles.consumedFoodsHeader}>
          <Text style={styles.consumedFoodsTitle}>Consumed Foods</Text>
          {consumedFoods.length > 0 && (
            <TouchableOpacity onPress={clearAllFoods} style={styles.clearButton}>
              <Icon name="trash" size={25} color="#FF5722" />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={consumedFoods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.consumedFoodItem}>
              <Text style={styles.consumedFoodText}>{item.name}</Text>
              <Text style={styles.consumedFoodCalories}>{item.calories} cal</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>No foods consumed yet</Text>
          }
        />
      </View>

      {/* Modal for Custom Food */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom Food</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Food Name"
              placeholderTextColor="#999"
              value={customFoodName}
              onChangeText={setCustomFoodName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Calories"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={customFoodCalories}
              onChangeText={setCustomFoodCalories}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButtonPrimary} onPress={addCustomFood}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
    fontWeight:600,
    margin:10,
    backgroundColor:'#FFFFFFa1',
    borderRadius:10,
    padding:5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2C3E50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  foodItemText: {
    fontSize: 16,
    color: '#34495E',
  },
  calorieSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin:10,
  },
  calorieLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
  },
  consumedFoodsContainer: {
    flex: 1,
  },
  consumedFoodsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  consumedFoodsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginLeft:10
  },
  clearButton: {
    padding: 5,
  },
  consumedFoodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginLeft:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consumedFoodText: {
    fontSize: 16,
    color: '#34495E',
  },
  consumedFoodCalories: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  emptyListText: {
    textAlign: 'center',
    color: '#7F8C8D',
    marginTop: 20,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2C3E50',
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonPrimary: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  modalButtonSecondary: {
    flex: 1,
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CalorieCounterApp;