/**
 * CookScreen - Recipe List with Backend Integration
 * 
 * Features:
 * - Fetches recipes from backend API
 * - Loading and error states
 * - Pull-to-refresh
 * - Network debugging
 * - JWT authentication (automatic via apiClient)
 */

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
  RefreshControl,
  StyleSheet 
} from 'react-native';
import apiClient from '../services/apiClient';

interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  cookTimeMinutes?: number;
  servings?: number;
}

export default function CookScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      console.log('📡 Fetching recipes from backend...');
      
      // Calls backend: GET /api/v1/recipes?source=local
      // JWT token is automatically attached by apiClient
      const response = await apiClient.get('/recipes?source=local');
      
      console.log('✅ Recipes fetched:', response.data.data?.length || 0, 'recipes');
      
      // Handle different response formats
      const recipesData = response.data.data || response.data.recipes || response.data || [];
      setRecipes(recipesData);
      setError('');
      
    } catch (err: any) {
      console.error('❌ Failed to fetch recipes:', err);
      
      // User-friendly error messages
      if (err.message?.includes('Network')) {
        setError('Cannot connect to backend.\nIs the server running?');
      } else if (err.status === 401) {
        setError('Please log in to view recipes');
      } else if (err.status === 404) {
        setError('Recipes endpoint not found');
      } else {
        setError(err.message || 'Failed to load recipes');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecipes();
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1f56e0" />
        <Text style={styles.loadingText}>Loading recipes...</Text>
      </View>
    );
  }

  // Error state with debug info
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.error}>{error}</Text>
        
        <Button title="Retry" onPress={fetchRecipes} color="#1f56e0" />
        
        {/* Debug info */}
        <View style={styles.debugBox}>
          <Text style={styles.debugTitle}>🔧 Debug Info:</Text>
          <Text style={styles.debugText}>Backend: {apiClient.defaults.baseURL}</Text>
          <Text style={styles.debugText}></Text>
          <Text style={styles.debugText}>Check backend is running:</Text>
          <Text style={styles.debugCode}>uvicorn app.main:app --host 0.0.0.0 --port 8000</Text>
        </View>
      </View>
    );
  }

  // Empty state
  if (recipes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>🍳</Text>
        <Text style={styles.emptyText}>No recipes found</Text>
        <Text style={styles.emptySubtext}>Try adding some recipes to the database</Text>
        <Button title="Refresh" onPress={fetchRecipes} color="#1f56e0" />
      </View>
    );
  }

  // Success - show recipes
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What do you want to cook?</Text>
      <Text style={styles.subtitle}>{recipes.length} recipes available</Text>
      
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={[
                styles.difficultyBadge,
                item.difficulty === 'easy' && styles.difficultyEasy,
                item.difficulty === 'medium' && styles.difficultyMedium,
                item.difficulty === 'hard' && styles.difficultyHard,
              ]}>
                <Text style={styles.difficultyText}>
                  {item.difficulty || 'N/A'}
                </Text>
              </View>
            </View>
            
            {(item.cookTimeMinutes || item.servings) && (
              <View style={styles.cardMeta}>
                {item.cookTimeMinutes && (
                  <Text style={styles.metaText}>⏱️ {item.cookTimeMinutes} min</Text>
                )}
                {item.servings && (
                  <Text style={styles.metaText}>👥 {item.servings} servings</Text>
                )}
              </View>
            )}
            
            <Text style={styles.cookButton}>Cook This! →</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  error: { 
    fontSize: 16,
    color: '#e94560', 
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  debugBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    width: '100%',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  debugCode: {
    fontSize: 11,
    color: '#4caf50',
    fontFamily: 'monospace',
    marginTop: 4,
  },
  card: { 
    backgroundColor: 'white', 
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#1a1a2e',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  difficultyEasy: {
    backgroundColor: '#4caf50',
  },
  difficultyMedium: {
    backgroundColor: '#ff9800',
  },
  difficultyHard: {
    backgroundColor: '#f44336',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  cookButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f56e0',
    marginTop: 8,
  },
});
