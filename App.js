import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CLIENT SETUP ---
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CUISINE_DATABASE = {
  indian: {
    label: '🇮🇳 Indian Traditional',
    desc: 'Rich spices, aromatic herbs & whole grains',
    veg: {
      breakfast: [
        { 
          name: 'Paneer & Spinach Bhurji w/ Multigrain Toast', 
          calories: 380, protein: '22g', carbs: '28g', fats: '16g',
          materials: ['200g Fresh Paneer', '1 cup Chopped Spinach', '1 Onion & Tomato', '2 Slices Multigrain Bread', 'Turmeric, Salt, Ghee'],
          instructions: '1. Crumble fresh paneer and finely chop spinach.\n2. Sauté onions, garlic, and green chilies in a pan with 1 tsp ghee.\n3. Add chopped spinach and crumbled paneer, toss with turmeric and salt.\n4. Serve hot alongside toasted multigrain bread.' 
        },
        { 
          name: 'Masala Oats w/ Roasted Chana & Chai', 
          calories: 340, protein: '14g', carbs: '46g', fats: '8g',
          materials: ['1 cup Rolled Oats', '1/2 cup Roasted Chana', 'Chopped Tomatoes & Onions', 'Indian Spice Mix', 'Chai Tea Ingredients'],
          instructions: '1. Boil water in a pan and add rolled oats.\n2. Stir in chopped onions, tomatoes, turmeric, and cumin powder.\n3. Simmer until creamy, garnish with crisp roasted chana.\n4. Pair with a warm cup of spiced Indian masala tea.' 
        },
        { 
          name: 'Moong Dal Chela w/ Mint Chutney', 
          calories: 310, protein: '18g', carbs: '42g', fats: '6g',
          materials: ['1 cup Yellow Moong Dal (Soaked)', 'Fresh Mint & Coriander', '1 Green Chili', 'Grated Ginger', 'Light Oil Spray'],
          instructions: '1. Blend soaked moong dal into a smooth batter with ginger and green chili.\n2. Pour onto a hot non-stick pan like a pancake and spread evenly.\n3. Cook until crisp on both sides with a light oil spray.\n4. Serve fresh with homemade mint and coriander chutney.' 
        }
      ],
      lunch: [
        { 
          name: 'Dal Tadka, Brown Rice & Palak Paneer', 
          calories: 680, protein: '32g', carbs: '82g', fats: '20g',
          materials: ['1 cup Yellow Lentils (Toor Dal)', '1/2 cup Brown Rice', '150g Paneer', '2 cups Spinach Puree', 'Ghee, Garlic & Cumin'],
          instructions: '1. Pressure cook yellow lentils until soft, then temper with ghee, garlic, and cumin.\n2. Boil brown rice separately until fluffy.\n3. Prepare spinach puree and simmer paneer cubes in the spiced gravy.\n4. Serve warm together in a balanced meal bowl.' 
        },
        { 
          name: 'Rajma Masala w/ Jeera Rice & Cucumber Raita', 
          calories: 620, protein: '24g', carbs: '90g', fats: '12g',
          materials: ['1 cup Red Kidney Beans (Rajma)', '1/2 cup Basmati Rice', '1/2 cup Curd (Yogurt)', '1 Cucumber', 'Onion-Tomato Masala Paste'],
          instructions: '1. Boil soaked kidney beans until tender.\n2. Simmer in a rich onion-tomato masala gravy with coriander and garam masala.\n3. Prepare cumin-tempered basmati rice.\n4. Serve alongside freshly whipped cucumber raita.' 
        },
        { 
          name: 'Chole w/ Whole Wheat Roti & Salad', 
          calories: 650, protein: '22g', carbs: '88g', fats: '14g',
          materials: ['1 cup Chickpeas (Kabuli Chana)', 'Whole Wheat Flour (Atta)', '1 Red Onion', 'Lemon & Spices', 'Chole Masala Powder'],
          instructions: '1. Cook chickpeas with tea leaves for color and rich flavor.\n2. Sauté onions, tomatoes, and chole spice blend, then simmer chickpeas.\n3. Roll and bake fresh whole wheat rotis on a skillet.\n4. Serve with a crisp onion and lemon salad.' 
        }
      ],
      dinner: [
        { 
          name: 'Tofu Tikka Masala w/ Missi Roti', 
          calories: 550, protein: '28g', carbs: '58g', fats: '18g',
          materials: ['200g Firm Tofu', '2 tbsp Curd', 'Chickpea Flour (Besan)', 'Tandoori Spice Mix', 'Tomato Puree'],
          instructions: '1. Marinate cubed tofu in curd, red chili powder, and tandoori spices.\n2. Pan-sear tofu cubes until slightly charred.\n3. Prepare onion-tomato gravy and simmer the grilled tofu.\n4. Serve hot with chickpea-flour infused missi rotis.' 
        },
        { 
          name: 'Mixed Vegetable Handi w/ Quinoa Pilaf', 
          calories: 490, protein: '16g', carbs: '66g', fats: '12g',
          materials: ['1 cup Chopped Veggies (Carrots, Beans, Peas)', '1/2 cup Quinoa', '10 Cashews (for paste)', 'Whole Spices'],
          instructions: '1. Chop carrots, beans, peas, and cauliflower.\n2. Cook vegetables in a creamy cashew-tomato sauce.\n3. Rinse and boil quinoa with whole spices for a nutty aroma.\n4. Plate together for a light, nutritious evening meal.' 
        },
        { 
          name: 'Soya Chunk Curry w/ Brown Rice', 
          calories: 580, protein: '38g', carbs: '72g', fats: '10g',
          materials: ['1 cup High-Protein Soya Chunks', '1/2 cup Brown Rice', 'Ginger-Garlic Paste', 'Chopped Tomatoes', 'Curry Spices'],
          instructions: '1. Soak soya chunks in boiling water for 10 minutes, then squeeze dry.\n2. Sauté with onions, ginger paste, and aromatic spices.\n3. Simmer in a flavorful tomato-based gravy.\n4. Serve piping hot over a bed of steamed brown rice.' 
        }
      ]
    },
    nonVeg: {
      breakfast: [
        { 
          name: 'Egg Bhurji w/ Multigrain Roti & Chai', 
          calories: 410, protein: '26g', carbs: '32g', fats: '18g',
          materials: ['3 Whole Eggs', '1 Onion & Green Chili', '2 Multigrain Rotis', 'Butter or Oil', 'Chai Spices'],
          instructions: '1. Crack eggs into a bowl and whisk with salt and pepper.\n2. Sauté onions, tomatoes, and green chilies in a pan.\n3. Pour in eggs and scramble gently until just set.\n4. Serve with hot multigrain rotis and masala tea.' 
        },
        { 
          name: 'Chicken Sausage & Egg Scramble', 
          calories: 390, protein: '30g', carbs: '12g', fats: '16g',
          materials: ['2 Lean Chicken Sausages', '2 Whole Eggs', 'Fresh Herbs', 'Black Pepper', 'Olive Oil'],
          instructions: '1. Slice and pan-fry lean chicken sausages until golden.\n2. Pour beaten eggs directly into the pan.\n3. Fold gently with fresh herbs until creamy and cooked.\n4. Plate immediately while warm.' 
        },
        { 
          name: 'Boiled Eggs w/ Spiced Toast & Fresh Fruit', 
          calories: 350, protein: '22g', carbs: '36g', fats: '12g',
          materials: ['3 Eggs', '2 Slices Whole Grain Bread', '1 Apple or Orange', 'Black Pepper & Chaat Masala'],
          instructions: '1. Boil eggs for exactly 9 minutes for soft-firm yolks.\n2. Toast whole grain bread and sprinkle with black pepper and herbs.\n3. Serve alongside a bowl of seasonal fresh fruit.' 
        }
      ],
      lunch: [
        { 
          name: 'Chicken Curry w/ Brown Rice & Onion Salad', 
          calories: 710, protein: '48g', carbs: '76g', fats: '18g',
          materials: ['250g Chicken Breasts', '1/2 cup Brown Rice', 'Mustard Oil', 'Whole Spices', '1 Red Onion & Lemon'],
          instructions: '1. Brown chicken pieces in mustard oil with whole spices.\n2. Add onion-tomato paste and simmer until tender and aromatic.\n3. Cook brown rice until fluffy.\n4. Serve with sliced onions drizzled with lemon juice.' 
        },
        { 
          name: 'Fish Curry w/ Steamed Rice & Kachumber', 
          calories: 630, protein: '42g', carbs: '70g', fats: '14g',
          materials: ['200g White Fish Fillets', '1/2 cup White Rice', 'Coconut Milk', 'Tamarind Paste', 'Cucumber & Tomato'],
          instructions: '1. Lightly sear fish fillets with turmeric and salt.\n2. Prepare a tangy tamarind and coconut milk base.\n3. Poach fish gently in the curry for 5 minutes.\n4. Serve with steamed rice and cucumber kachumber salad.' 
        },
        { 
          name: 'Mutton Keema Matar w/ Whole Wheat Roti', 
          calories: 750, protein: '44g', carbs: '64g', fats: '26g',
          materials: ['200g Lean Minced Mutton (Keema)', '1/2 cup Green Peas (Matar)', 'Whole Wheat Atta', 'Garam Masala'],
          instructions: '1. Sauté minced mutton with ginger-garlic paste and green peas.\n2. Simmer with crushed tomatoes and ground spices until dry and rich.\n3. Roll out fresh whole wheat rotis.\n4. Serve hot together.' 
        }
      ],
      dinner: [
        { 
          name: 'Tandoori Chicken Breast w/ Mint Chutney & Salad', 
          calories: 580, protein: '54g', carbs: '14g', fats: '12g',
          materials: ['250g Boneless Chicken Breast', '2 tbsp Hung Curd', 'Tandoori Masala', 'Lemon Juice', 'Fresh Mint Leaves'],
          instructions: '1. Marinate chicken breast in yogurt, lemon juice, Kashmiri chili, and tandoori masala.\n2. Grill or bake at 200°C for 20 minutes.\n3. Serve with fresh mint chutney and crisp green salad.' 
        },
        { 
          name: 'Grilled Fish Tikka w/ Quinoa Salad', 
          calories: 510, protein: '46g', carbs: '42g', fats: '10g',
          materials: ['200g Firm Fish Cubes', '1/2 cup Cooked Quinoa', 'Lemon Vinaigrette', 'Spiced Yogurt Marinade'],
          instructions: '1. Cut firm fish into chunks and coat in spiced yogurt marinade.\n2. Skewer and pan-grill until flaky and charred at edges.\n3. Toss cooked quinoa with diced cucumbers and lemon vinaigrette.\n4. Plate together.' 
        },
        { 
          name: 'Chicken Kebab Wrap w/ Mint Yoghurt Sauce', 
          calories: 560, protein: '40g', carbs: '48g', fats: '16g',
          materials: ['2 Chicken Kebabs', '1 Whole Wheat Flatbread', 'Sliced Red Onions', 'Mint Yogurt Sauce'],
          instructions: '1. Grill spiced minced chicken kebabs.\n2. Warm a whole wheat flatbread or wrap.\n3. Layer with kebabs, sliced onions, and mint yogurt spread, then roll tightly.' 
        }
      ]
    }
  },
  mediterranean: {
    label: '🌊 Mediterranean',
    desc: 'Olive oil, fresh herbs, feta, grains & greens',
    veg: {
      breakfast: [
        { 
          name: 'Greek Yogurt w/ Honey, Walnuts & Berries', 
          calories: 380, protein: '22g', carbs: '38g', fats: '12g',
          materials: ['1 cup Thick Plain Greek Yogurt', '1/4 cup Walnuts', '1/2 cup Fresh Berries', '1 tbsp Raw Honey'],
          instructions: '1. Scoop thick Greek yogurt into a bowl.\n2. Top with crushed walnuts and fresh seasonal berries.\n3. Drizzle raw organic honey over the top.' 
        },
        { 
          name: 'Avocado Toast w/ Feta Cheese & Hemp Seeds', 
          calories: 360, protein: '14g', carbs: '32g', fats: '20g',
          materials: ['1 Ripe Avocado', '2 Slices Artisan Sourdough Bread', '30g Feta Cheese', '1 tbsp Hemp Seeds', 'Lemon'],
          instructions: '1. Toast thick artisan sourdough bread.\n2. Mash ripe avocado with lemon juice, salt, and pepper.\n3. Top with crumbled feta cheese and hemp seeds.' 
        },
        { 
          name: 'Mediterranean Spinach & Feta Omelet', 
          calories: 390, protein: '24g', carbs: '10g', fats: '18g',
          materials: ['3 Large Eggs', '1 cup Baby Spinach', '40g Feta Cheese', '1 tbsp Extra Virgin Olive Oil'],
          instructions: '1. Whisk eggs and pour into an oiled skillet.\n2. Fold in baby spinach and crumbled feta cheese.\n3. Cook until set and fold over.' 
        }
      ],
      lunch: [
        { 
          name: 'Chickpea & Feta Salad w/ Lemon Dressing', 
          calories: 540, protein: '22g', carbs: '62g', fats: '18g',
          materials: ['1 can Rinsed Chickpeas', '1/2 cup Feta Cheese', 'Kalamata Olives', 'Diced Cucumber', 'Olive Oil & Lemon'],
          instructions: '1. Toss rinsed chickpeas with diced tomatoes, cucumbers, and olives.\n2. Crumble Greek feta over the mixture.\n3. Dress with olive oil, lemon juice, and dried oregano.' 
        },
        { 
          name: 'Grilled Halloumi & Quinoa Bowl', 
          calories: 580, protein: '28g', carbs: '58g', fats: '22g',
          materials: ['100g Halloumi Cheese', '1/2 cup Cooked Quinoa', 'Roasted Bell Peppers', 'Olive Oil'],
          instructions: '1. Grill slices of halloumi cheese until golden brown lines appear.\n2. Serve over a warm bed of cooked quinoa and roasted bell peppers.\n3. Drizzle with light olive oil.' 
        },
        { 
          name: 'Falafel Pita Wrap w/ Tahini & Cucumber Salad', 
          calories: 610, protein: '20g', carbs: '78g', fats: '16g',
          materials: ['4 Baked Falafel Balls', '1 Whole Wheat Pita Bread', 'Creamy Tahini Sauce', 'Chopped Cucumber Salad'],
          instructions: '1. Bake or air-fry chickpea falafel patties.\n2. Stuff inside a warm whole-wheat pita pocket.\n3. Add chopped cucumber salad and drizzle with creamy tahini sauce.' 
        }
      ],
      dinner: [
        { 
          name: 'Baked Eggplant Parmigiana w/ Green Salad', 
          calories: 490, protein: '18g', carbs: '52g', fats: '20g',
          materials: ['1 Large Eggplant', '1 cup Marinara Sauce', '50g Mozzarella / Feta', 'Mixed Green Salad'],
          instructions: '1. Slice eggplant and bake until tender.\n2. Layer in a dish with marinara sauce and light mozzarella or feta.\n3. Bake until bubbly and serve with a side green salad.' 
        },
        { 
          name: 'Lentil & Vegetable Greek Stew w/ Crusty Bread', 
          calories: 520, protein: '24g', carbs: '74g', fats: '10g',
          materials: ['1 cup Brown Lentils', 'Carrots, Celery, Garlic', '1 Slice Crusty Bread', 'Fresh Dill'],
          instructions: '1. Simmer brown lentils with diced carrots, celery, tomatoes, and garlic.\n2. Season with bay leaves and fresh dill.\n3. Serve warm with crusty whole-grain bread.' 
        },
        { 
          name: 'Stuffed Bell Peppers w/ Rice & Pine Nuts', 
          calories: 460, protein: '16g', carbs: '64g', fats: '14g',
          materials: ['2 Large Bell Peppers', '1/2 cup Cooked Rice', '2 tbsp Toasted Pine Nuts', 'Mediterranean Herbs'],
          instructions: '1. Hollow out bell peppers.\n2. Fill with a mixture of cooked rice, herbs, and toasted pine nuts.\n3. Bake at 190°C for 25 minutes.' 
        }
      ]
    },
    nonVeg: {
      breakfast: [
        { 
          name: 'Smoked Salmon & Egg White Scramble', 
          calories: 390, protein: '32g', carbs: '8g', fats: '14g',
          materials: ['4 Egg Whites', '100g Smoked Salmon', 'Fresh Dill', 'Olive Oil Spray'],
          instructions: '1. Whisk egg whites and scramble lightly in a pan.\n2. Fold in flaked smoked salmon and fresh dill.\n3. Serve warm.' 
        },
        { 
          name: 'Greek Style Turkey Sausage & Scrambled Eggs', 
          calories: 420, protein: '34g', carbs: '6g', fats: '18g',
          materials: ['2 Turkey Sausages', '2 Whole Eggs', 'Olive Oil', 'Salt & Black Pepper'],
          instructions: '1. Sauté turkey sausage links until browned.\n2. Scramble eggs separately and serve together.' 
        },
        { 
          name: 'Poached Eggs w/ Prosciutto & Tomato', 
          calories: 370, protein: '28g', carbs: '10g', fats: '16g',
          materials: ['2 Eggs', '2 Slices Prosciutto', '1 Ripe Tomato', 'Splash of White Vinegar'],
          instructions: '1. Poach eggs in simmering water with a splash of vinegar.\n2. Serve over sliced ripe tomatoes and lean prosciutto.' 
        }
      ],
      lunch: [
        { 
          name: 'Grilled Lemon Herb Chicken w/ Greek Salad', 
          calories: 640, protein: '48g', carbs: '18g', fats: '18g',
          materials: ['250g Chicken Breast', '1 Lemon', 'Dried Oregano', 'Cucumbers, Olives & Feta'],
          instructions: '1. Marinate chicken breast in lemon, garlic, and olive oil.\n2. Grill until fully cooked and slice.\n3. Toss with crisp cucumbers, tomatoes, olives, and feta cheese.' 
        },
        { 
          name: 'Mediterranean Tuna & Olive Pasta Salad', 
          calories: 590, protein: '42g', carbs: '68g', fats: '14g',
          materials: ['1 can Albacore Tuna', '1/2 cup Whole Wheat Pasta', 'Kalamata Olives', 'Capers & Olive Oil'],
          instructions: '1. Boil whole-wheat pasta and let cool.\n2. Toss with canned tuna, kalamata olives, capers, and olive oil dressing.' 
        },
        { 
          name: 'Turkey Gyro Bowl w/ Tzatziki & Brown Rice', 
          calories: 620, protein: '44g', carbs: '62g', fats: '16g',
          materials: ['200g Lean Ground Turkey', '1/2 cup Brown Rice', 'Tzatziki Sauce', 'Sliced Tomatoes & Red Onions'],
          instructions: '1. Sauté seasoned lean ground turkey.\n2. Serve over brown rice with tomatoes, onions, and a dollop of tzatziki.' 
        }
      ],
      dinner: [
        { 
          name: 'Baked Salmon w/ Roasted Asparagus & Tzatziki', 
          calories: 680, protein: '44g', carbs: '12g', fats: '24g',
          materials: ['220g Wild Salmon Fillet', '1 Bunch Asparagus', '2 tbsp Tzatziki Sauce', 'Lemon & Dill'],
          instructions: '1. Season salmon fillet with dill, lemon, and olive oil.\n2. Roast alongside trimmed asparagus at 200°C for 12 minutes.\n3. Serve with homemade cucumber tzatziki.' 
        },
        { 
          name: 'Grilled Sea Bass w/ Olive & Tomato Salsa', 
          calories: 530, protein: '46g', carbs: '14g', fats: '12g',
          materials: ['200g Sea Bass Fillet', 'Diced Tomatoes', 'Black Olives & Capers', 'Olive Oil'],
          instructions: '1. Grill sea bass fillet until flaky.\n2. Top with a fresh salsa made from diced tomatoes, black olives, capers, and olive oil.' 
        },
        { 
          name: 'Chicken Souvlaki Skewers w/ Quinoa Pilaf', 
          calories: 580, protein: '50g', carbs: '52g', fats: '14g',
          materials: ['250g Chicken Cubes', 'Wooden Skewers', '1/2 cup Quinoa', 'Lemon-Herb Marinade'],
          instructions: '1. Thread cubed chicken onto skewers with lemon-herb marinade.\n2. Grill or bake until charred.\n3. Serve over fluffy quinoa pilaf.' 
        }
      ]
    }
  }
};

export default function App() {
  const [screen, setScreen] = useState('signup');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('meals'); // 'meals' | 'grocery' | 'instructions'
  
  // Credentials & Preferences
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dietaryType, setDietaryType] = useState('veg');
  const [selectedCuisine, setSelectedCuisine] = useState('indian');
  const [saving, setSaving] = useState(false);

  // Checkable Grocery List State
  const [checkedGroceryItems, setCheckedGroceryItems] = useState({});

  // Active Meal Selection Indices for Swapping
  const [bfIndex, setBfIndex] = useState(0);
  const [lunchIndex, setLunchIndex] = useState(0);
  const [dinnerIndex, setDinnerIndex] = useState(0);

  const activeCuisineData = CUISINE_DATABASE[selectedCuisine] || CUISINE_DATABASE.indian;
  const activeMealsList = activeCuisineData[dietaryType];

  const handleSignUp = async () => {
    if (!fullName || !email) {
      alert('Please fill in your name and email.');
      return;
    }

    setSaving(true);
    try {
      await supabase.from('profiles').upsert([
        {
          full_name: fullName,
          email: email,
          dietary_type: dietaryType,
          cuisine_preference: selectedCuisine,
          updated_at: new Date(),
        },
      ]);
    } catch (err) {
      console.log('Supabase sync note: Local state active.');
    } finally {
      setSaving(false);
      setScreen('dashboard');
    }
  };

  const swapMeal = (category) => {
    if (category === 'bf') {
      setBfIndex((prev) => (prev + 1) % activeMealsList.breakfast.length);
    } else if (category === 'lunch') {
      setLunchIndex((prev) => (prev + 1) % activeMealsList.lunch.length);
    } else if (category === 'dinner') {
      setDinnerIndex((prev) => (prev + 1) % activeMealsList.dinner.length);
    }
  };

  const toggleGroceryCheck = (index) => {
    setCheckedGroceryItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // --- SIGN-UP SCREEN ---
  if (screen === 'signup') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#090A0F" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>SECURE PROTOCOL v1.0</Text>
            </View>
            <Text style={styles.title}>VITALITY <Text style={styles.titleGlow}>AI</Text></Text>
            <Text style={styles.subtitle}>Initialize your biological optimization journey</Text>
          </View>

          <View style={styles.formCard}>
            
            <Text style={styles.sectionLabel}>01. OPERATOR CREDENTIALS</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Krishiiv Sharma"
                placeholderTextColor="#525B75"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NEURAL EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="operator@vitality.ai"
                placeholderTextColor="#525B75"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>02. DIETARY PREFERENCE</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleButton, dietaryType === 'veg' && styles.toggleButtonVegActive]}
                activeOpacity={0.8}
                onPress={() => setDietaryType('veg')}
              >
                <Text style={[styles.toggleText, dietaryType === 'veg' && styles.toggleTextVegActive]}>
                  🟢 VEGETARIAN
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toggleButton, dietaryType === 'nonVeg' && styles.toggleButtonNonVegActive]}
                activeOpacity={0.8}
                onPress={() => setDietaryType('nonVeg')}
              >
                <Text style={[styles.toggleText, dietaryType === 'nonVeg' && styles.toggleTextNonVegActive]}>
                  🔴 NON-VEGETARIAN
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>03. CUISINE PROTOCOL</Text>
            <View style={styles.grid}>
              {Object.keys(CUISINE_DATABASE).map((key) => {
                const item = CUISINE_DATABASE[key];
                const isSelected = selectedCuisine === key;
                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.mealCard, isSelected && styles.mealCardSelected]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedCuisine(key)}
                  >
                    <Text style={[styles.mealLabel, isSelected && styles.mealLabelSelected]}>
                      {item.label}
                    </Text>
                    <Text style={styles.mealDesc}>{item.desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.85}
              onPress={handleSignUp}
              disabled={saving}
            >
              <Text style={styles.submitButtonText}>
                {saving ? 'SYNCHRONIZING...' : 'INITIALIZE SYSTEM'}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- DASHBOARD SCREEN WITH SIDEBAR ---
  const currentBf = activeMealsList.breakfast[bfIndex];
  const currentLunch = activeMealsList.lunch[lunchIndex];
  const currentDinner = activeMealsList.dinner[dinnerIndex];

  // Dynamically compile grocery items ONLY from currently selected dishes
  const currentGroceryList = [...currentBf.materials, ...currentLunch.materials, ...currentDinner.materials];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090A0F" />
      
      {/* SIDEBAR DRAWER OVERLAY */}
      {sidebarOpen && (
        <View style={styles.sidebarOverlay}>
          <View style={styles.sidebarDrawer}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>VITALITY <Text style={styles.titleGlow}>AI</Text></Text>
              <TouchableOpacity onPress={() => setSidebarOpen(false)}>
                <Text style={styles.closeSidebarText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sidebarUserCard}>
              <Text style={styles.sidebarUserLabel}>OPERATOR</Text>
              <Text style={styles.sidebarUserName}>{fullName.toUpperCase() || 'KRISHIIV'}</Text>
              <Text style={styles.sidebarUserProtocol}>{activeCuisineData.label} ({dietaryType.toUpperCase()})</Text>
            </View>

            {/* SIDEBAR NAVIGATION ITEMS */}
            <TouchableOpacity
              style={[styles.sidebarNavItem, activeTab === 'meals' && styles.sidebarNavActive]}
              onPress={() => { setActiveTab('meals'); setSidebarOpen(false); }}
            >
              <Text style={[styles.sidebarNavText, activeTab === 'meals' && styles.sidebarNavTextActive]}>
                🥗 AI Meal Protocol
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sidebarNavItem, activeTab === 'grocery' && styles.sidebarNavActive]}
              onPress={() => { setActiveTab('grocery'); setSidebarOpen(false); }}
            >
              <Text style={[styles.sidebarNavText, activeTab === 'grocery' && styles.sidebarNavTextActive]}>
                🛒 Checkable Grocery List
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sidebarNavItem, activeTab === 'instructions' && styles.sidebarNavActive]}
              onPress={() => { setActiveTab('instructions'); setSidebarOpen(false); }}
            >
              <Text style={[styles.sidebarNavText, activeTab === 'instructions' && styles.sidebarNavTextActive]}>
                🍳 Recipes & Material Needed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sidebarNavItem, { marginTop: 'auto', borderTopWidth: 1, borderColor: '#1E2538' }]}
              onPress={() => { setSidebarOpen(false); setScreen('signup'); }}
            >
              <Text style={[styles.sidebarNavText, { color: '#FF3366' }]}>
                ⚙️ Reconfigure Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* MAIN DASHBOARD VIEW */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* DASHBOARD HEADER WITH MENU TOGGLE */}
        <View style={styles.dashHeader}>
          <TouchableOpacity
            style={styles.menuToggleButton}
            onPress={() => setSidebarOpen(true)}
          >
            <Text style={styles.menuToggleText}>☰ MENU</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.dashWelcome}>OPERATOR: {fullName.toUpperCase() || 'KRISHIIV'}</Text>
            <Text style={styles.dashProtocol}>{activeCuisineData.label} ({dietaryType.toUpperCase()})</Text>
          </View>
        </View>

        {/* TAB VIEW 1: AI MEAL PROTOCOL */}
        {activeTab === 'meals' && (
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>
              AI GENERATED {activeCuisineData.label.toUpperCase()} PROTOCOL
            </Text>
            
            {/* Breakfast */}
            <View style={styles.aiMealItem}>
              <View style={styles.mealHeaderRow}>
                <Text style={styles.aiMealTime}>08:00 AM • BREAKFAST</Text>
                <TouchableOpacity style={styles.swapButton} onPress={() => swapMeal('bf')}>
                  <Text style={styles.swapButtonText}>💡 IDEA FOR SWAP</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.aiMealTitle}>{currentBf.name}</Text>
              
              <View style={styles.macroPillRow}>
                <Text style={styles.macroPill}>🔥 {currentBf.calories} kcal</Text>
                <Text style={styles.macroPill}>💪 {currentBf.protein} Protein</Text>
                <Text style={styles.macroPill}>🌾 {currentBf.carbs} Carbs</Text>
                <Text style={styles.macroPill}>🥑 {currentBf.fats} Fats</Text>
              </View>
            </View>

            {/* Lunch */}
            <View style={styles.aiMealItem}>
              <View style={styles.mealHeaderRow}>
                <Text style={styles.aiMealTime}>01:30 PM • LUNCH</Text>
                <TouchableOpacity style={styles.swapButton} onPress={() => swapMeal('lunch')}>
                  <Text style={styles.swapButtonText}>💡 IDEA FOR SWAP</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.aiMealTitle}>{currentLunch.name}</Text>

              <View style={styles.macroPillRow}>
                <Text style={styles.macroPill}>🔥 {currentLunch.calories} kcal</Text>
                <Text style={styles.macroPill}>💪 {currentLunch.protein} Protein</Text>
                <Text style={styles.macroPill}>🌾 {currentLunch.carbs} Carbs</Text>
                <Text style={styles.macroPill}>🥑 {currentLunch.fats} Fats</Text>
              </View>
            </View>

            {/* Dinner */}
            <View style={styles.aiMealItem}>
              <View style={styles.mealHeaderRow}>
                <Text style={styles.aiMealTime}>07:00 PM • DINNER</Text>
                <TouchableOpacity style={styles.swapButton} onPress={() => swapMeal('dinner')}>
                  <Text style={styles.swapButtonText}>💡 IDEA FOR SWAP</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.aiMealTitle}>{currentDinner.name}</Text>

              <View style={styles.macroPillRow}>
                <Text style={styles.macroPill}>🔥 {currentDinner.calories} kcal</Text>
                <Text style={styles.macroPill}>💪 {currentDinner.protein} Protein</Text>
                <Text style={styles.macroPill}>🌾 {currentDinner.carbs} Carbs</Text>
                <Text style={styles.macroPill}>🥑 {currentDinner.fats} Fats</Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB VIEW 2: DYNAMIC CHECKABLE GROCERY LIST */}
        {activeTab === 'grocery' && (
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>DYNAMIC SHOPPING LIST FOR ACTIVE DISHES</Text>
            <Text style={styles.subtleText}>Derived strictly from your current Breakfast, Lunch, and Dinner:</Text>
            
            {currentGroceryList.map((item, index) => {
              const isChecked = checkedGroceryItems[index];
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.groceryItemRow, isChecked && styles.groceryItemRowChecked]}
                  onPress={() => toggleGroceryCheck(index)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.checkboxIcon}>{isChecked ? '☑️' : '⏹️'}</Text>
                  <Text style={[styles.groceryItemText, isChecked && styles.groceryItemTextChecked]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* TAB VIEW 3: RECIPES WITH MATERIALS NEEDED */}
        {activeTab === 'instructions' && (
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>COOKING DIRECTIONS & MATERIALS NEEDED</Text>
            
            {/* Breakfast Instructions & Material */}
            <View style={styles.instructionBlock}>
              <Text style={styles.instructionMealTitle}>🍳 Breakfast: {currentBf.name}</Text>
              
              <View style={styles.materialsBox}>
                <Text style={styles.materialsHeader}>🛒 INGREDIENTS & MATERIAL REQUIRED:</Text>
                {currentBf.materials.map((mat, i) => (
                  <Text key={i} style={styles.materialItemText}>• {mat}</Text>
                ))}
              </View>

              <Text style={styles.materialsHeader}>👨‍🍳 STEP-BY-STEP DIRECTIONS:</Text>
              <Text style={styles.instructionText}>{currentBf.instructions}</Text>
            </View>

            {/* Lunch Instructions & Material */}
            <View style={styles.instructionBlock}>
              <Text style={styles.instructionMealTitle}>🍲 Lunch: {currentLunch.name}</Text>
              
              <View style={styles.materialsBox}>
                <Text style={styles.materialsHeader}>🛒 INGREDIENTS & MATERIAL REQUIRED:</Text>
                {currentLunch.materials.map((mat, i) => (
                  <Text key={i} style={styles.materialItemText}>• {mat}</Text>
                ))}
              </View>

              <Text style={styles.materialsHeader}>👨‍🍳 STEP-BY-STEP DIRECTIONS:</Text>
              <Text style={styles.instructionText}>{currentLunch.instructions}</Text>
            </View>

            {/* Dinner Instructions & Material */}
            <View style={styles.instructionBlock}>
              <Text style={styles.instructionMealTitle}>🥘 Dinner: {currentDinner.name}</Text>
              
              <View style={styles.materialsBox}>
                <Text style={styles.materialsHeader}>🛒 INGREDIENTS & MATERIAL REQUIRED:</Text>
                {currentDinner.materials.map((mat, i) => (
                  <Text key={i} style={styles.materialItemText}>• {mat}</Text>
                ))}
              </View>

              <Text style={styles.materialsHeader}>👨‍🍳 STEP-BY-STEP DIRECTIONS:</Text>
              <Text style={styles.instructionText}>{currentDinner.instructions}</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0F',
  },
  scrollContent: {
    padding: 20,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  badgeContainer: {
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.3)',
    marginBottom: 12,
  },
  badgeText: {
    color: '#00F2FE',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  titleGlow: {
    color: '#00F2FE',
    textShadowColor: 'rgba(0, 242, 254, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#8A95B0',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#121622',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E2538',
  },
  sectionLabel: {
    color: '#00F2FE',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  subtleText: {
    color: '#8A95B0',
    fontSize: 13,
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#8A95B0',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#0A0D14',
    borderWidth: 1,
    borderColor: '#1E2538',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#0A0D14',
    borderWidth: 1,
    borderColor: '#1E2538',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  toggleButtonVegActive: {
    borderColor: '#00FF66',
    backgroundColor: 'rgba(0, 255, 102, 0.08)',
  },
  toggleButtonNonVegActive: {
    borderColor: '#FF3366',
    backgroundColor: 'rgba(255, 51, 102, 0.08)',
  },
  toggleText: {
    color: '#8A95B0',
    fontSize: 12,
    fontWeight: '800',
  },
  toggleTextVegActive: {
    color: '#00FF66',
  },
  toggleTextNonVegActive: {
    color: '#FF3366',
  },
  grid: {
    gap: 12,
    marginBottom: 30,
  },
  mealCard: {
    backgroundColor: '#0A0D14',
    borderWidth: 1,
    borderColor: '#1E2538',
    borderRadius: 16,
    padding: 16,
  },
  mealCardSelected: {
    borderColor: '#00F2FE',
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
  },
  mealLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  mealLabelSelected: {
    color: '#00F2FE',
  },
  mealDesc: {
    color: '#8A95B0',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#00F2FE',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#090A0F',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  dashHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2538',
  },
  menuToggleButton: {
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.4)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  menuToggleText: {
    color: '#00F2FE',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  dashWelcome: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  dashProtocol: {
    color: '#00F2FE',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 999,
  },
  sidebarDrawer: {
    width: 280,
    height: '100%',
    backgroundColor: '#121622',
    padding: 24,
    borderRightWidth: 1,
    borderColor: '#1E2538',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sidebarTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  closeSidebarText: {
    color: '#8A95B0',
    fontSize: 18,
    fontWeight: '800',
  },
  sidebarUserCard: {
    backgroundColor: '#0A0D14',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1E2538',
  },
  sidebarUserLabel: {
    color: '#00F2FE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sidebarUserName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 2,
  },
  sidebarUserProtocol: {
    color: '#8A95B0',
    fontSize: 11,
    marginTop: 2,
  },
  sidebarNavItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  sidebarNavActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
  },
  sidebarNavText: {
    color: '#8A95B0',
    fontSize: 14,
    fontWeight: '700',
  },
  sidebarNavTextActive: {
    color: '#00F2FE',
  },
  card: {
    backgroundColor: '#121622',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E2538',
    marginBottom: 20,
  },
  aiMealItem: {
    backgroundColor: '#0A0D14',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E2538',
    marginBottom: 12,
  },
  mealHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiMealTime: {
    color: '#00F2FE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  swapButton: {
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  swapButtonText: {
    color: '#00F2FE',
    fontSize: 10,
    fontWeight: '800',
  },
  aiMealTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  macroPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  macroPill: {
    backgroundColor: '#121622',
    borderWidth: 1,
    borderColor: '#1E2538',
    color: '#8A95B0',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  groceryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0D14',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2538',
    marginBottom: 8,
  },
  groceryItemRowChecked: {
    backgroundColor: 'rgba(0, 255, 102, 0.05)',
    borderColor: '#00FF66',
  },
  checkboxIcon: {
    marginRight: 10,
    fontSize: 14,
  },
  groceryItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  groceryItemTextChecked: {
    color: '#525B75',
    textDecorationLine: 'line-through',
  },
  instructionBlock: {
    backgroundColor: '#0A0D14',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E2538',
    marginBottom: 16,
  },
  instructionMealTitle: {
    color: '#00F2FE',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  materialsBox: {
    backgroundColor: '#121622',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1E2538',
    marginBottom: 12,
  },
  materialsHeader: {
    color: '#00F2FE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  materialItemText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  instructionText: {
    color: '#8A95B0',
    fontSize: 13,
    lineHeight: 20,
  },
});