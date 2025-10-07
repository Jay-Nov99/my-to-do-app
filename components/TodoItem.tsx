
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { TodoItem as TodoItemType } from '@/types/todo';
import * as Haptics from 'expo-haptics';

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onDelete }) => {
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(item.id);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDelete(item.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted,
        ]}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        {item.completed && (
          <IconSymbol
            name="checkmark"
            size={16}
            color={colors.card}
          />
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            item.completed && styles.titleCompleted,
          ]}
        >
          {item.title}
        </Text>
        {item.description && (
          <Text
            style={[
              styles.description,
              item.completed && styles.descriptionCompleted,
            ]}
          >
            {item.description}
          </Text>
        )}
      </View>

      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}
        hitSlop={8}
      >
        <IconSymbol
          name="trash"
          size={18}
          color={colors.accent}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxCompleted: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
    opacity: 0.7,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
});
