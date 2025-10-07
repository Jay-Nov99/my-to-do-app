
import React from "react";
import { Stack, Link, router } from "expo-router";
import { 
  FlatList, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  Platform,
  RefreshControl,
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { useTodos } from "@/hooks/useTodos";
import { TodoItem } from "@/components/TodoItem";
import { TodoFilter } from "@/types/todo";
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const { todos, stats, filter, setFilter, toggleTodo, deleteTodo } = useTodos();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAddTodo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/add-todo');
  };

  const handleFilterPress = (newFilter: TodoFilter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilter(newFilter);
  };

  const renderFilterButton = (filterType: TodoFilter, label: string, count: number) => (
    <Pressable
      style={[
        styles.filterButton,
        filter === filterType && styles.filterButtonActive,
      ]}
      onPress={() => handleFilterPress(filterType)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === filterType && styles.filterButtonTextActive,
        ]}
      >
        {label} ({count})
      </Text>
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>My Tasks</Text>
        <Text style={styles.statsSubtitle}>
          {stats.active} active, {stats.completed} completed
        </Text>
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All', stats.total)}
        {renderFilterButton('active', 'Active', stats.active)}
        {renderFilterButton('completed', 'Done', stats.completed)}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <IconSymbol 
        name="checkmark.circle" 
        size={64} 
        color={colors.textSecondary} 
      />
      <Text style={styles.emptyStateTitle}>
        {filter === 'completed' 
          ? 'No completed tasks yet' 
          : filter === 'active' 
          ? 'No active tasks' 
          : 'No tasks yet'
        }
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        {filter === 'completed' 
          ? 'Complete some tasks to see them here' 
          : 'Tap the + button to add your first task'
        }
      </Text>
    </View>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={handleAddTodo}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" color={colors.primary} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => console.log('Settings pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol
        name="gear"
        color={colors.primary}
      />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "To-Do",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={[
            styles.listContainer,
            Platform.OS !== 'ios' && styles.listContainerWithTabBar,
            todos.length === 0 && styles.listContainerEmpty,
          ]}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />

        {/* Floating Add Button */}
        <Pressable
          style={styles.floatingButton}
          onPress={handleAddTodo}
        >
          <IconSymbol name="plus" size={24} color={colors.card} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingVertical: 16,
  },
  listContainerWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  listContainerEmpty: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  headerButtonContainer: {
    padding: 6,
  },
  floatingButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 120, // Account for tab bar
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(41, 98, 255, 0.3)',
    elevation: 8,
  },
});
