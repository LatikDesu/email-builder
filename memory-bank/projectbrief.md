# Project Brief: Email Builder with Drag & Drop

## Overview
Listmonk Email Builder - A React-based visual email template editor that needs to be redesigned with drag-and-drop functionality using @dnd-kit library.

## Current State
- **Technology Stack**: React 18, TypeScript, Vite, Material-UI, Zustand
- **Architecture**: Component-based with centralized state management
- **Block System**: Registry pattern with 11 supported block types
- **Current Interaction**: Click-based selection and configuration
- **State Management**: Zustand store with reactive subscriptions

## Target Redesign Goals
- **Primary Objective**: Implement drag-and-drop functionality using @dnd-kit
- **Enhanced UX**: Intuitive drag-and-drop interface for email template building
- **Maintain Architecture**: Preserve existing block registry and validation systems
- **Performance**: Ensure smooth drag interactions without DOM mutations during drag

## Key Requirements
1. Replace current click-based block addition with drag-and-drop
2. Enable reordering of existing blocks through drag-and-drop
3. Maintain all existing block types and their configurations
4. Preserve current state management and validation systems
5. Ensure accessibility compliance with @dnd-kit features

## Success Criteria
- Seamless drag-and-drop experience for all block types
- No regression in existing functionality
- Improved user experience and workflow efficiency
- Maintained performance and accessibility standards
